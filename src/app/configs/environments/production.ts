'use strict';

import {EnvironmentConfig} from 'types/index';

import Knex from 'knex';
import os from 'os';

const mysqlConnectionString = {
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
};

const KNEX_CONFIG = {
  client: 'mysql',
  connection: mysqlConnectionString
};

const knex = Knex(KNEX_CONFIG);

const MORGAN_LOG_PATH = `${os.homedir()}/.logs`;

const HEALTHCHECKS = {
  DEPLOY_BASE_URL: 'http://localhost:3000',
  URL: 'https://hc-ping.com/uuid'
};

const config: EnvironmentConfig = {
  knex: knex,
  MORGAN_LOG_PATH: MORGAN_LOG_PATH,
  HEALTHCHECKS: HEALTHCHECKS
};

export default config;
