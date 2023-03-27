'use strict';

require("dotenv").config();
import common from './environments/common';
const environment = require(`./environments/${process.env.NODE_ENV}`);

const config = {
  ...common,
  ...environment
};

// module.exports = config;
export = config;
