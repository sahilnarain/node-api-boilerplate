'use strict';

// Include core libraries
import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import compression from 'compression';

import healthchecks from 'app/services/healthchecks';

const app = express();

// Include config files
import config from 'app/configs/config';
import status from 'app/configs/status';
import loggerConfig from 'app/configs/logger';

const isDeveloping = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

app.disable('x-powered-by');

// Include middleware
import authsMiddleware from 'app/middlewares/auths';

// Include routers
import healthchecksRouter from 'app/routes/healthchecks';
import placeholderRouter from 'app/routes/placeholder';

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
const dbSelfCheck = async () => {
  let dbSelfCheckQuery = config.knex.select(config.knex.raw('now()'));

  try {
    await dbSelfCheckQuery;
    console.log('Connected to MySQL DB...');
  } catch (e) {
    console.log('MySQL connection error', e);
  }
};
dbSelfCheck();

// Set allowed headers
// eslint-disable-next-line no-unused-vars
app.use((req: any, res: any, next: any) => {
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
app.get('/ping', (req: any, res: any) => {
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
app.use((req: any, res: any, next: any) => {
  res.statusCode = 404;
  res.json(status.getStatus('url_missing'));
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err: any, req: any, res: any, next: any) => {
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
