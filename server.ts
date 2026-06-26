'use strict';

// Include core libraries
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import type {Request, Response, NextFunction} from 'express';

import healthchecks = require('app/services/healthchecks');

const app = express();

// Include config files
import config = require('app/configs/config');
import status = require('app/configs/status');
import loggerConfig = require('app/configs/logger');

const isDeveloping = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

app.disable('x-powered-by');

// Include middleware
import authsMiddleware = require('app/middlewares/auths');

// Include routers
import healthchecksRouter = require('app/routes/healthchecks');
import placeholderRouter = require('app/routes/placeholder');

// Use JSON body parser
app.use(compression());

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
// const dbSelfCheck = async (): Promise<void> => {
//   const dbSelfCheckQuery = config.knex.select(config.knex.raw('now()'));

//   try {
//     await dbSelfCheckQuery;
//     console.log('Connected to MySQL DB...');
//   } catch (e) {
//     console.log('MySQL connection error', e);
//   }
// };
// dbSelfCheck();

// Set allowed headers
// eslint-disable-next-line no-unused-vars
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
app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

// Use custom log format
app.use(loggerConfig.customLogFormat);

// Stream logs on screen for non-production
if (isDeveloping) {
  app.use(loggerConfig.devLogStream);
}

// Use middleware
app.use(authsMiddleware);

// Routes
app.use('/placeholder', placeholderRouter);

// Catch 404s
// eslint-disable-next-line no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 404;
  res.json(status.getStatus('url_missing'));
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log(new Date().toISOString(), err);
  }

  if (err && Object.prototype.hasOwnProperty.call(err, 'error')) {
    res.json(err);
  } else {
    const errResponse = status.getStatus('generic_fail');
    res.json(errResponse);
  }
});

app.listen(Number(config.SERVER_PORT), config.SERVER_IP, () => {
  console.log(`########## Environment: ${process.env.NODE_ENV} ##########`);
  console.log(`${new Date()}: Server running on port ${config.SERVER_PORT}...`);
});
