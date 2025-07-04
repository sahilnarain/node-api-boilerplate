import fs from 'fs';
import logger from 'morgan';
import config from 'app/configs/config'


// Create log file if it doesn't exist
fs.existsSync(`${config.MORGAN_LOG_PATH}`)
  ? null
  : fs.mkdirSync(`${config.MORGAN_LOG_PATH}`, {
    recursive: true
  });
let _logFile = `${config.MORGAN_LOG_PATH}/morgan.log`;
fs.existsSync(_logFile) ? null : fs.writeFileSync(_logFile, new Date().toISOString());

// Configure logging
// eslint-disable-next-line no-unused-vars
logger.token('req-body', (req: any, res: any) => {
  return JSON.stringify({
    params: req.query,
    body: req.body
  });
});

// eslint-disable-next-line no-unused-vars
logger.token('req-headers', (req, res) => {
  return JSON.stringify(req.headers);
});

// eslint-disable-next-line no-unused-vars
logger.token('tracking', (req: any, res) => {
  return req.headers['x-device-id'] ? req.headers['x-device-id'] : 'DEFAULT';
});

// eslint-disable-next-line no-unused-vars
logger.token('uri', (req: any, res) => {
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

export default {
  customLogFormat: _customLogFormat,
  devLogStream: _devLogStream
}
