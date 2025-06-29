'use strict';

import {Healthcheck} from 'types/index';

import config from 'app/configs/config';

import utilsService from 'app/services/utils';

const check = async (): Promise<Healthcheck> => {
  const checkQuery = config.knex.select(config.knex.raw('now() as date'));

  let result = await checkQuery;

  return utilsService.sanitizeSqlResult(result[0]);
};

export default {
  check: check
};
