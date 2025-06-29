'use strict';

import express from 'express';

const router = express.Router();

import controller from 'app/controllers/placeholder';

router.post('/', controller.createPlaceholder);
router.get('/', controller.getPlaceholders);
router.get('/:placeholder_id', controller.getPlaceholder);
router.get('/:placeholder_id', controller.updatePlaceholder);

export default router;
