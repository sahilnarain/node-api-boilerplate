'use strict';

const fs = require('fs');
const logger = require('morgan');

const config = require('app/configs/config');

// Create log file if it doesn't exist
fs.existsSync(`${config.MORGAN_LOG_PATH}`) ? null : fs.mkdirSync(`${config.MORGAN_LOG_PATH}`, {
  recursive: true
});
let _logFile = `${config.MORGAN_LOG_PATH}/morgan.log`;
fs.existsSync(_logFile) ? null : fs.writeFileSync(_logFile, new Date().toISOString());

// Configure logging
logger.token('req-body', (req, res) => {
  return JSON.stringify({
    params: req.query,
    body: req.body
  });
});

logger.token('req-headers', (req, res) => {
  return JSON.stringify(req.headers);
});

logger.token('tracking', (req, res) => {
  return req.headers['x-device-id'] ? req.headers['x-device-id'] : 'DEFAULT';
  'DEFAULT';
});

logger.token('uri', (req, res) => {
  return req.originalUrl.split('?')[0];
});

const customLogFormat = ':date[iso] :method :uri :status :response-time :tracking :req-headers :req-body';
const accessLogStream = fs.createWriteStream(config.MORGAN_LOG_PATH + '/morgan.log', {
  flags: 'a'
});

const _customLogFormat = logger(customLogFormat, {
  stream: accessLogStream
});

const _devLogStream = logger('dev');

module.exports = {
  customLogFormat: _customLogFormat,
  devLogStream: _devLogStream
};
