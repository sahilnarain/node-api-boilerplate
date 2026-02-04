'use strict';
process.env.NODE_ENV = 'test';

const fs = require('fs');

const config = require('app/configs/config');

const dbSetup = './docs/db/sql-init.sql';
const dbTeardown = './tests/setup/data/teardown.sql';

const setup = async () => {
  if (!process.env.TEST_DATABASE_NAME) {
    console.log('TEST_DATABASE_NAME not set, quitting.');
    process.exit();
  }

  let dbSetupSql = fs.readFileSync(dbSetup).toString();

  dbSetupSql = dbSetupSql.replace('IF EXISTS boilerplate', `IF EXISTS ${process.env.TEST_DATABASE_NAME}`);
  dbSetupSql = dbSetupSql.replace('CREATE DATABASE IF NOT EXISTS boilerplate', `CREATE DATABASE IF NOT EXISTS ${process.env.TEST_DATABASE_NAME}`);
  dbSetupSql = dbSetupSql.replace('USE boilerplate', `USE ${process.env.TEST_DATABASE_NAME}`);

  await config.knex.raw(dbSetupSql);

  return;
};

const teardown = async () => {
  if (!process.env.TEST_DATABASE_NAME) {
    console.log('TEST_DATABASE_NAME not set, quitting.');
    process.exit();
  }

  let teardownSql = fs.readFileSync(dbTeardown).toString();

  teardownSql = teardownSql.replace(/boilerplate/g, `${process.env.TEST_DATABASE_NAME}`);

  await config.knex.raw(teardownSql);

  return;
};

module.exports = {
  setup: setup,
  teardown: teardown
};
