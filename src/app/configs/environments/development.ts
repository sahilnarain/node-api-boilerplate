import { EnviornmentConfig, HealthChecksConfig, KnexConfig, MysqlConnectionString } from 'types';

import Knex from 'knex';
import os from 'os';

const mysqlConnectionString: MysqlConnectionString = {
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
};

const KNEX_CONFIG: KnexConfig = {
  client: 'mysql',
  connection: mysqlConnectionString
};

const knex = Knex(KNEX_CONFIG);

const MORGAN_LOG_PATH: string = `${os.homedir()}/.logs`;

const HEALTHCHECKS: HealthChecksConfig = {
  DEPLOY_BASE_URL: 'http://localhost:3000',
  URL: 'https://hc-ping.com/uuid'
};

const config: EnviornmentConfig = {
  knex: knex,
  MORGAN_LOG_PATH: MORGAN_LOG_PATH,
  HEALTHCHECKS: HEALTHCHECKS
};

export default config;
module.exports = config;