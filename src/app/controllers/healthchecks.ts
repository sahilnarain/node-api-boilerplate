'use strict';

import {HealthchecksApiResponse} from 'types/index';

import healthchecksService from 'app/services/healthchecks';

const healthchecks = async (req, res, next): Promise<HealthchecksApiResponse> => {
  let result = await healthchecksService.healthchecks();

  return res.json(result);
};

export default {
  healthchecks: healthchecks
};
