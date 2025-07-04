import { Router } from 'express';
import controller from 'app/controllers/placeholder'

const router = Router()


router.post('/', controller.createPlaceholder);
router.get('/', controller.getPlaceholders);
router.get('/:placeholder_id', controller.getPlaceholder);
router.get('/:placeholder_id', controller.updatePlaceholder);

export default router