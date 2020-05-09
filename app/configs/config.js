'use strict';

const common = require('app/configs/environments/common');
const environment = require(`app/configs/environments/${process.env.NODE_ENV}`);

const config = {
  ...common,
  ...environment
};

module.exports = config;
