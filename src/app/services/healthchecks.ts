import config from "app/configs/config";
import status from "app/configs/status";
import wrapperService from 'app/services/wrapper';
import healthchecksModel from 'app/models/healthchecks';
import type { Status } from 'app/configs/types';

export type InitFn = () => Promise<void>
export type HealthchecksFn = () => Promise<Status>

const init: InitFn = async () => {
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

const healthchecks: HealthchecksFn = async () => {
  let result = await healthchecksModel.check();

  if (!result) {
    throw new Error('generic_fail');
  }

  let response = status.getStatus('success');
  return response;
};

export default {
  init: wrapperService.wrap(init),
  healthchecks: wrapperService.wrap(healthchecks)
}