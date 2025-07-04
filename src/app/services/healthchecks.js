'use strict';

import { HEALTHCHECKS } from 'app/configs/config';
import { getStatus } from 'app/configs/status';

import { wrap } from 'app/services/wrapper';

import { check } from 'app/models/healthchecks';

const init = async () => {
  if (`${process.env.NODE_ENV}` === 'test') {
    return;
  }

  let selfOptions = {
    url: HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
    method: 'GET'
  };

  let healthcheckOptions = {
    url: HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
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

const healthchecks = async () => {
  let result = await check();

  if (!result) {
    throw new Error('generic_fail');
  }

  let response = getStatus('success');
  return response;
};

export default {
  init: wrap(init),
  healthchecks: wrap(healthchecks)
};
