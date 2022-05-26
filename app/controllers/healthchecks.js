'use strict';

const healthchecksService = require('app/services/healthchecks');
const wrapperService = require('app/services/wrapper');

const healthchecks = async (req, res, next) => {
  let healthchecksParams = {};

  let result = await healthchecksService.healthchecks(healthchecksParams);
  return res.json(result);
};

module.exports = {
  healthchecks: wrapperService.wrap(healthchecks)
};
