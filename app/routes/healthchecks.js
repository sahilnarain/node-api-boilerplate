'use strict';

const express = require('express');
const router = express.Router();

const controller = require('app/controllers/healthchecks');

router.get('/', controller.healthchecks);

module.exports = router;
