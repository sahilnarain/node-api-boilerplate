'use strict';

const request = require('request');
const fs = require('fs');

const setup = require('../setup/setup');

const config = require('app/configs/config');

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

beforeAll((cb) => {
  return setup.setup(cb);
});

afterAll((cb) => {
  return setup.teardown(cb);
});

beforeEach((cb) => {
  expect(process.env.NODE_ENV).toBe('test');

  return cb(null);
});

test('1. Ping should be up and working', (cb) => {
  let options = JSON.parse(JSON.stringify(data.pingApi.options));

  request(options, (err, response, body) => {
    expect(err).toBeNull();
    expect(body).toBe('pong');

    return cb(null);
  });
});
