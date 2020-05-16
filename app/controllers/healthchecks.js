'use strict';

const healthchecksService = require('app/services/healthchecks');

const healthchecks = (req, res, next) => {
  let healthchecksParams = {};

  healthchecksService.healthchecks(healthchecksParams, (err, result) => {
    if (err) {
      return next(err);
    }

    return res.json(result);
  });
};

module.exports = {
  healthchecks: healthchecks
};
