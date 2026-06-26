'use strict';

import type {CommonConfig} from 'types/config';

const IPV6 = true;

const config: CommonConfig = {
  SERVER_IP: IPV6 ? '::' : '0.0.0.0',
  SERVER_PORT: process.env.PORT || 3000
};

export = config;
