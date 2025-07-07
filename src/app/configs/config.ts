import common from 'app/configs/environments/common';
import type { EnviornmentConfig, Config } from 'types';
const environment: EnviornmentConfig = require(`app/configs/environments/${process.env.NODE_ENV}`);

export const config: Config = {
  ...common,
  ...environment
};

export default config;