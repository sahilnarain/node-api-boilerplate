'use strict';

import knex, {Knex} from 'knex';
import os from 'os';

import type {EnvironmentConfig} from 'types/config';

const mysqlConnectionString: Knex.MySqlConnectionConfig = {
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
};

const KNEX_CONFIG: Knex.Config = {
  client: 'mysql',
  connection: mysqlConnectionString
};

const MORGAN_LOG_PATH = `${os.homedir()}/.logs`;

const HEALTHCHECKS = {
  DEPLOY_BASE_URL: 'http://localhost:3000',
  URL: 'https://hc-ping.com/uuid'
};

const config: EnvironmentConfig = {
  knex: knex(KNEX_CONFIG),
  MORGAN_LOG_PATH: MORGAN_LOG_PATH,
  HEALTHCHECKS: HEALTHCHECKS
};

export = config;
