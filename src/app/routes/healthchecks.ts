'use strict';

import express from 'express';
const router = express.Router();

import controller from 'app/controllers/healthchecks';

router.get('/', controller.healthchecks);

export = router;
