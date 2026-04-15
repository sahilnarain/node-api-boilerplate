'use strict';

const undici = require('undici');

const config = require('app/configs/config');
const status = require('app/configs/status');

const wrapperService = require('app/services/wrapper');

const healthchecksModel = require('app/models/healthchecks');

const init = async () => {
  if (`${process.env.NODE_ENV}` !== 'production') {
    return;
  }

  let selfOptions = {
    url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
    method: 'GET'
  };

  let healthcheckOptions = {
    url: config.HEALTHCHECKS.URL,
    method: 'GET'
  };

  if (config.IPV6) {
    healthcheckOptions.dispatcher = new undici.Agent({connect: {family: 6}});
    // eslint-disable-next-line no-global-assign
    fetch = undici.fetch;
  }

  setInterval(async () => {
    let response;
    try {
      response = await (await fetch(selfOptions.url, selfOptions)).json();
    } catch (e) {
      return;
    }

    if (response && response.code && response.code === 'success') {
      try {
        await fetch(healthcheckOptions.url, healthcheckOptions);
      } catch (e) {
        // Do nothing
      }
    }
  }, 30000);
};

const healthchecks = async () => {
  let result = await healthchecksModel.check();

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
