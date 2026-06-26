'use strict';

import config = require('app/configs/config');

import utilsService = require('app/services/utils');
import wrapperService = require('app/services/wrapper');

const check = async (): Promise<Record<string, unknown>> => {
  const checkQuery = config.knex.select(config.knex.raw('now()'));

  const result = (await checkQuery) as Array<Record<string, unknown>>;

  return utilsService.sanitizeSqlResult(result[0]);
};

export = {
  check: wrapperService.wrap(check)
};
