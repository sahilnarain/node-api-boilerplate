'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

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

let seq = 0;

test.describe('HEALTHCHECKS', async () => {
  test.before(async () => {
    await setup.setup();

    return;
  });

  test.after(async () => {
    await setup.teardown();

    return;
  });

  test.beforeEach(async () => {
    assert.strictEqual(process.env.NODE_ENV, 'test');

    return;
  });

  test(`${++seq}. Healthcheck should be up and working`, async () => {
    let options = JSON.parse(JSON.stringify(data.healthchecksApi.options));
    options = utilsService.prepareFetchOptions(options);

    let result = await (await fetch(options.url, options)).json();

    assert.ok(result.hasOwnProperty('code'), true);
    assert.strictEqual(result.code, 'success');
    assert.ok(result.hasOwnProperty('error'), true);
    assert.strictEqual(result.error, false);
    assert.ok(result.hasOwnProperty('message'), true);

    return;
  });

  console.log();
  return;
});
