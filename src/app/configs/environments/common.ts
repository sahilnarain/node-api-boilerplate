'use strict';
import type { CommonConfig } from 'types';

const IPV6 = true;

const config = {
  SERVER_IP: IPV6 ? '::' : '0.0.0.0',
  SERVER_PORT: process.env.PORT || 3000
} as CommonConfig;

export default config;