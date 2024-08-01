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

let seq = 0;

test.describe('PING', async () => {
  test.before(async () => {
    await setup.setup();

    return;
  });

  test.beforeEach(async () => {
    assert.strictEqual(process.env.NODE_ENV, 'test');

    return;
  });

  test.after(async () => {
    await setup.teardown();

    return;
  });

  test(`${++seq}. Ping should be up and running.`, async () => {
    let options = JSON.parse(JSON.stringify(data.pingApi.options));
    options = utilsService.prepareFetchOptions(options);

    let result = await (await fetch(options.url, options)).text();

    assert.strictEqual(result, 'pong');

    return;
  });

  console.log();
  return;
});
