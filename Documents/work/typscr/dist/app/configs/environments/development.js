'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("dotenv").config();
const knex_1 = __importDefault(require("knex"));
const os_1 = __importDefault(require("os"));
const mysqlConnectionString = {
    host: "localhost",
    user: "root",
    password: "12345",
    database: "xane",
    port: 3306
};
const KNEX_CONFIG = {
    client: 'mysql',
    connection: mysqlConnectionString
};
const knex = (0, knex_1.default)(KNEX_CONFIG);
const MORGAN_LOG_PATH = `${os_1.default.homedir()}/.logs`;
const HEALTHCHECKS = {
    DEPLOY_BASE_URL: 'http://localhost:3000',
    URL: 'https://hc-ping.com/uuid'
};
const config = {
    knex: knex,
    MORGAN_LOG_PATH: MORGAN_LOG_PATH,
    HEALTHCHECKS: HEALTHCHECKS
};
module.exports = config;
