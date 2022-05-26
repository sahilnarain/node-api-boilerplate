'use strict';

const request = require('request');

const config = require('app/configs/config');
const status = require('app/configs/status');

const wrapperService = require('app/services/wrapper');

const healthchecksModel = require('app/models/healthchecks');

const init = () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  setInterval(() => {
    request({url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks', method: 'GET'}, (err, response, body) => {
      if (response && response.statusCode === 200 && body === JSON.stringify(status.getStatus('success'))) {
        request({url: config.HEALTHCHECKS.URL, method: 'GET'}, (err, response, body) => {
          // Do nothing
        });
      }
    });
  }, 30000);
};

const healthchecks = async (params) => {
  let healthchecksParams = {};
  let result = await healthchecksModel.check(healthchecksParams);

  if (!result) {
    throw new Error('generic_fail');
  }

  let response = status.getStatus('success');
  return response;
};

module.exports = {
  init: init,
  healthchecks: wrapperService.wrap(healthchecks)
};
