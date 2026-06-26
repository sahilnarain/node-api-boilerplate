'use strict';

import * as undici from 'undici';

import config = require('app/configs/config');
import status = require('app/configs/status');

import wrapperService = require('app/services/wrapper');

import healthchecksModel = require('app/models/healthchecks');

import type {Status, FetchOptions} from 'types/api';

const init = async (): Promise<void> => {
  if (`${process.env.NODE_ENV}` !== 'production') {
    return;
  }

  const selfOptions: FetchOptions = {
    url: config.HEALTHCHECKS.DEPLOY_BASE_URL + '/healthchecks',
    method: 'GET'
  };

  const healthcheckOptions: FetchOptions = {
    url: config.HEALTHCHECKS.URL,
    method: 'GET'
  };

  if (config.IPV6) {
    healthcheckOptions.dispatcher = new undici.Agent({connect: {family: 6}});
    // eslint-disable-next-line no-unused-vars
    const fetch = undici.fetch;
  }

  setInterval(async () => {
    let response: {code?: string} | undefined;
    try {
      response = (await (await fetch(selfOptions.url, selfOptions as RequestInit)).json()) as {code?: string};
    } catch (e) {
      return;
    }

    if (response && response.code && response.code === 'success') {
      try {
        await fetch(healthcheckOptions.url, healthcheckOptions as RequestInit);
      } catch (e) {
        // Do nothing
      }
    }
  }, 30000);
};

const healthchecks = async (): Promise<Status> => {
  const result = await healthchecksModel.check();

  if (!result) {
    throw new Error('generic_fail');
  }

  const response = status.getStatus('success');
  return response;
};

export = {
  init: wrapperService.wrap(init),
  healthchecks: wrapperService.wrap(healthchecks)
};
