'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const setup = require('../setup/setup');

const utilsService = require('app/services/utils');

const config = require('app/configs/config');

const BASE_URL = `http://${config.SERVER_IP}:${config.SERVER_PORT}`;

const data = {
  healthchecksApi: {
    options: {
      url: BASE_URL + '/healthchecks',
      method: 'GET',
      json: true,
      headers: {},
      qs: {},
      body: {}
    }
  }
};

test.before(async () => {
  return await setup.setup();
});

test.after(async () => {
  return await setup.teardown();
});

test.beforeEach(async () => {
  assert.strictEqual(process.env.NODE_ENV, 'test');

  return null;
});

test.describe('Healthchecks');

test('1. Healthcheck should be up and working', async () => {
  let options = JSON.parse(JSON.stringify(data.healthchecksApi.options));
  options = utilsService.prepareFetchOptions(options);

  let result = await (await fetch(options.url, options)).json();

  assert.strictEqual(result.hasOwnProperty('code'), true);
  assert.strictEqual(result.hasOwnProperty('error'), true);
  assert.strictEqual(result.error, false);
  assert.strictEqual(result.hasOwnProperty('message'), true);

  return null;
});

return null;
