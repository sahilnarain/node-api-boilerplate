'use strict';

const config = require('app/configs/config');

const utilsService = require('app/services/utils');
const wrapperService = require('app/services/wrapper');

const check = async () => {
  const checkQuery = config.knex.select(config.knex.raw('now()'));

  let result = await checkQuery;

  return utilsService.sanitizeSqlResult(result[0]);
};

module.exports = {
  check: wrapperService.wrap(check)
};
