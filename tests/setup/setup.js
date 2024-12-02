'use strict';
process.env.NODE_ENV = 'test';

const fs = require('fs');

const config = require('app/configs/config');

const dbSetup = './docs/db/sql-init.sql';
const dbTeardown = './tests/setup/data/teardown.sql';

const setup = async () => {
  let dbSetupSql = fs.readFileSync(dbSetup).toString();

  dbSetupSql = dbSetupSql.replace('IF EXISTS boilerplate', 'IF EXISTS boilerplate_test');
  dbSetupSql = dbSetupSql.replace('CREATE DATABASE IF NOT EXISTS boilerplate', 'CREATE DATABASE IF NOT EXISTS boilerplate_test');
  dbSetupSql = dbSetupSql.replace('USE boilerplate', 'USE boilerplate_test');

  await config.knex.raw(dbSetupSql);

  return;
};

const teardown = async () => {
  let teardownSql = fs.readFileSync(dbTeardown).toString();

  teardownSql = teardownSql.replace(/boilerplate/g, 'boilerplate_test');

  await config.knex.raw(teardownSql);

  return;
};

module.exports = {
  setup: setup,
  teardown: teardown
};
