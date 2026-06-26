'use strict';

import type {Request, Response, NextFunction} from 'express';

import healthchecksService = require('app/services/healthchecks');
import wrapperService = require('app/services/wrapper');

// eslint-disable-next-line no-unused-vars
const healthchecks = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const result = await healthchecksService.healthchecks();
  return res.json(result);
};

export = {
  healthchecks: wrapperService.wrap(healthchecks)
};
