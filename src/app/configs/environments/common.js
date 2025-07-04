'use strict';

const IPV6 = true;

const config = {
  SERVER_IP: IPV6 ? '::' : '0.0.0.0',
  SERVER_PORT: process.env.PORT || 3000
};

module.exports = config;
