'use strict';

import config from 'app/configs/config';

import utilsService from 'app/services/utils';
import wrapperService from 'app/services/wrapper';

const check = async (params: any) => {
  const checkQuery = config.knex.select(config.knex.raw('now()'));

  let result = await checkQuery;

  return utilsService.sanitizeSqlResult(result[0]);
};

export = {
  check: wrapperService.wrap(check)
};
