import { Router } from 'express';
import controller from 'app/controllers/healthchecks';

const router = Router();

router.get('/', controller.healthchecks);

export default router;