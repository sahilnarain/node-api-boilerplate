'use strict';

const config = require('app/configs/config');
const status = require('app/configs/status');

const wrapperService = require('app/services/wrapper');

const healthchecksModel = require('app/models/healthchecks');

const init = async () => {
  if (`${process.env.NODE_ENV}` === 'test') {
    return;
  }

  let selfOptions = {
    url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
    method: 'GET'
  };

  let healthcheckOptions = {
    url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
    method: 'GET'
  };

  setInterval(async () => {
    let response;
    try {
      response = await (await fetch(selfOptions.url, selfOptions)).json();
    } catch (e) {
      return;
    }

    if (response && response.code && response.code === 'success') {
      await (await fetch(healthcheckOptions.url, healthcheckOptions)).json();
    }
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
  init: wrapperService.wrap(init),
  healthchecks: wrapperService.wrap(healthchecks)
};
