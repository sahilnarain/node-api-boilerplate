'use strict';

const mysql = require('mysql');
const os = require('os');

const mysqlConnectionString = {
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306,
  multipleStatements: true
};

const mysqlConnection = mysql.createConnection(mysqlConnectionString);

const MORGAN_LOG_PATH = `${os.homedir()}/.logs`;

const config = {
  mysqlConnection: mysqlConnection,
  MORGAN_LOG_PATH: MORGAN_LOG_PATH
};

module.exports = config;
