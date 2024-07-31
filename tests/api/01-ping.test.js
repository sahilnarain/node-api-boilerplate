'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');

const setup = require('../setup/setup');

const config = require('app/configs/config');

const utilsService = require('app/services/utils');

const BASE_URL = `http://${config.SERVER_IP}:${config.SERVER_PORT}`;

const data = {
  pingApi: {
    options: {
      url: BASE_URL + '/ping',
      method: 'GET',
      json: true,
      headers: {},
      qs: {},
      body: {}
    }
  }
};

test.beforeEach(async () => {
  assert.strictEqual(process.env.NODE_ENV, 'test');
});

test.before(async () => {
  return await setup.setup();
});

test.after(async () => {
  return await setup.teardown();
});

test.describe('Ping');

test('1. Ping should be up and running.', async () => {
  let options = JSON.parse(JSON.stringify(data.pingApi.options));
  options = utilsService.prepareFetchOptions(options);

  let result = await fetch(options.url, options);
  result = await result.text();

  assert.strictEqual(result, 'pong');

  return;
});
