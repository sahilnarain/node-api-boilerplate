'use strict';

const express = require('express');
const router = express.Router();

const controller = require('app/controllers/placeholder');

router.post('/', controller.createPlaceholder);
router.get('/', controller.getPlaceholders);
router.get('/:placeholder_id', controller.getPlaceholder);
router.get('/:placeholder_id', controller.updatePlaceholder);

module.exports = router;
