'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("dotenv").config();
const common_1 = __importDefault(require("./environments/common"));
const environment = require(`./environments/${process.env.NODE_ENV}`);
const config = Object.assign(Object.assign({}, common_1.default), environment);
module.exports = config;
