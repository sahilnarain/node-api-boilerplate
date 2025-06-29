'use strict';

import commonConfig from 'app/configs/environments/common';
import developmentConfig from 'app/configs/environments/development';
import testConfig from 'app/configs/environments/test';
import stagingConfig from 'app/configs/environments/staging';
import productionConfig from 'app/configs/environments/production';

let config;

switch (process.env.NODE_ENV) {
  case 'development':
  default:
    config = {...commonConfig, ...developmentConfig};
    break;

  case 'test':
    config = {...commonConfig, ...testConfig};
    break;

  case 'staging':
    config = {...commonConfig, ...stagingConfig};
    break;

  case 'production':
    config = {...commonConfig, ...productionConfig};
    break;
}

export default config;
