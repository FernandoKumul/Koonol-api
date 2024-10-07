import express from 'express';
import TianguisController from '../controllers/tianguisController';
import { validateData } from '../middleware/validationMiddleware';
import { tianguisSchema } from '../schemas/tianguisSchema';

const router = express.Router();

router.get('/', TianguisController.getTianguis);
router.post('/', validateData(tianguisSchema), TianguisController.createTianguis);

export default router;
