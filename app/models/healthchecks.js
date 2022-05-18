'use strict';

const squel = require('squel');

const config = require('app/configs/config');

const utilsService = require('app/services/utils');

const check = (params, callback) => {
  const checkQuery = squel.select().field('now()');

  // config.mysqlConnection.query(checkQuery.toString(), (err, result) => {
  //   if (err) {
  //     return callback(err);
  //   }
  //
  //   return callback(null, utilsService.sanitizeSqlResult(result));
  // });
  return callback(null, true);
};

module.exports = {
  check: check
};
