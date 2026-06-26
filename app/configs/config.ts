'use strict';

import type {Config, EnvironmentConfig} from 'types/config';

import common = require('app/configs/environments/common');

// Environment-specific config is selected dynamically via NODE_ENV.
const environment = require(`app/configs/environments/${process.env.NODE_ENV}`) as EnvironmentConfig;

const config: Config = {
  ...common,
  ...environment
};

export = config;
