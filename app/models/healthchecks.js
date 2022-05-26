'use strict';

const squel = require('squel');

const config = require('app/configs/config');

const utilsService = require('app/services/utils');
const wrapperService = require('app/services/wrapper');

const check = async (params) => {
  const checkQuery = squel.select().field('now()');

  // config.mysqlConnection.query(checkQuery.toString(), (err, result) => {
  //   if (err) {
  //     return callback(err);
  //   }
  //
  //   return callback(null, utilsService.sanitizeSqlResult(result));
  // });
  // return callback(null, true);
  return true;
};

module.exports = {
  check: wrapperService.wrap(check)
};
