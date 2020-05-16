'use strict';
process.env.NODE_ENV = 'test';

const async = require('async');
const fs = require('fs');

const config = require('app/configs/config');

const dbSetup = './docs/db/sql-init.sql';
const dbTeardown = './tests/setup/data/teardown.sql';

const setup = (callback) => {
  async.waterfall([
    (cb) => {
      fs.readFile(dbSetup, (err, result) => {
        if (err) {
          return cb(err);
        }

        return cb(null, result.toString());
      });
    },

    (dbSetupSql, cb) => {
      dbSetupSql = dbSetupSql.replace('IF EXISTS boilerplate', 'IF EXISTS boilerplate_test');
      dbSetupSql = dbSetupSql.replace('DATABASE boilerplate', 'DATABASE boilerplate_test');
      dbSetupSql = dbSetupSql.replace('USE boilerplate', 'USE boilerplate_test');

      return cb(null, dbSetupSql);
    },

    (dbSetupSql, cb) => {
      // config.mysqlConnection.query(dbSetupSql, (err, result) => {
      //   if (err) {
      //     return cb(err);
      //   }
      //
      return cb(null);
      // });
    }
  ], (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
};

const teardown = (callback) => {
  async.waterfall([
    (cb) => {
      fs.readFile(dbTeardown, (err, result) => {
        if (err) {
          return cb(err);
        }

        return cb(null, result.toString());
      });
    },

    (teardownSql, cb) => {
      teardownSql = teardownSql.replace(/boilerplate/g, 'boilerplate_test');

      return cb(null, teardownSql);
    },

    (teardownSql, cb) => {
      // config.mysqlConnection.query(teardownSql, (err, result) => {
      //   if (err) {
      //     return cb(err);
      //   }
      //
      return cb(null, true);
      // });
    }
  ], (err, result) => {
    if (err) {
      return callback(err);
    }

    return callback(null, result);
  });
};

module.exports = {
  setup: setup,
  teardown: teardown
};
