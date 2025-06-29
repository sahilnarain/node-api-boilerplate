'use strict';

import {CommonConfig} from 'types/index';

const IPV6 = true;

const config: CommonConfig = {
  IPV6: IPV6,
  SERVER_IP: IPV6 ? '::' : '0.0.0.0',
  SERVER_PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000
};

export default config;
