'use strict';

// Include core libraries
require("dotenv").config();
import express, { Application, Request, Response, Errback, NextFunction} from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const __dir = __dirname.slice(0,33);
fs.existsSync(`${__dirname}/node_modules/app`) ? fs.symlinkSync(`${__dirname}/app`, `${__dir}/node_modules/app`) : null;
import healthchecks from 'app/services/healthchecks';

const app: Application = express();

// Include config files
import config from './app/configs/config';

import status from 'app/configs/status';
// const loggerConfig = require('app/configs/logger');

const isDeveloping = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

// app.disable('x-powered-by');

// Include middleware
// const authsMiddleware = require('app/middlewares/auths');

// // Include routers
import healthchecksRouter from 'app/routes/healthchecks';

// // Use JSON body parser
app.use(
  bodyParser.json({
    limit: 1024102420
  })
);

app.use(
  bodyParser.urlencoded({
    limit: 1024102420,
    extended: true
  })
);

// DB connectivity check
const dbSelfCheck = async () => {
  let dbSelfCheckQuery = config.knex.select(config.knex.raw('now()'));

  try {
    let result = await dbSelfCheckQuery;
    console.log(result);
    console.log('Connected to MySQL DB...');
  } catch (e) {
    console.log('MySQL connection error', e);
  }
};
dbSelfCheck();

// Set allowed headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization,User-Agent,X-Auth,X-Version');

  if (isDeveloping) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  next();
});

// Healthcheck routes
healthchecks.init();
app.use('/healthchecks', healthchecksRouter);
app.get('/', (req: Request, res: Response) => {
  res.send('pong');
});

// Use custom log format
// app.use(loggerConfig.customLogFormat);

// // Stream logs on screen for non-production
// if (isDeveloping) {
//   app.use(loggerConfig.devLogStream);
// }

// // Use middleware
// app.use(authsMiddleware);

// Routes

// Catch 404s
app.use((req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 404;
  res.json(status.getStatus('url_missing'));
});

// Global error handler
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(new Date().toISOString(), err);
  }

  if (err.hasOwnProperty('error')) {
    res.json(err);
  } else {
    let err = status.getStatus('generic_fail');
    res.json(err);
  }
});

app.listen(config.SERVER_PORT, config.SERVER_IP, () => {
  console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
  console.log(`${new Date()}: Server running on port ${config.SERVER_PORT}...`);
});

// app.listen(4000, () => {
//   console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
//   console.log(`${new Date()}: Server running on port ${config.SERVER_PORT}...`);
//   });