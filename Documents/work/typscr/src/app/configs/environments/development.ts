'use strict';

require("dotenv").config();
import Knex from 'knex';
import os from 'os';

const mysqlConnectionString = {
  host: "localhost",
  user: "root",
  password: "12345",    
  database: "xane",
  port:3306
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

const config = {
  knex: knex,
  MORGAN_LOG_PATH: MORGAN_LOG_PATH,
  HEALTHCHECKS: HEALTHCHECKS
};

export = config;
