'use strict';

const request = require('request');
const fs = require('fs');

const setup = require('../setup/setup');

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

test('1. Healthcheck should be up and working', (cb) => {
  let options = JSON.parse(JSON.stringify(data.healthchecksApi.options));

  request(options, (err, response, body) => {
    expect(err).toBeNull();
    expect(body.code).toBe('success');
    expect(body.error).toBeFalsy();

    return cb(null);
  });
});
