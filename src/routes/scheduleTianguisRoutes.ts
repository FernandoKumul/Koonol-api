import express from 'express';
import ScheduleTianguisController from '../controllers/scheduleTianguisController';
import { validateData } from '../middleware/validationMiddleware';
import { scheduleTianguisSchema } from '../schemas/scheduleTianguisSchema';

const router = express.Router();

router.get('/', ScheduleTianguisController.getScheduleTianguis);
router.post('/', validateData(scheduleTianguisSchema), ScheduleTianguisController.createScheduleTianguis);

export default router;
