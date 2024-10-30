import express from "express";
import ScheduleTianguisController from "../controllers/scheduleTianguisController";
import { validateData } from "../middleware/validationMiddleware";
import { scheduleTianguisSchema } from "../schemas/ScheduleTianguisSchema/scheduleTianguisSchema";
import { scheduleTianguisUpdateSchema } from "../schemas/ScheduleTianguisSchema/scheduleTianguisUpdateSchema";

const router = express.Router();

router.get('/', ScheduleTianguisController.getScheduleTianguis);
router.post('/', validateData(scheduleTianguisSchema), ScheduleTianguisController.createScheduleTianguis);
router.get('/:id', ScheduleTianguisController.getScheduleTianguisById);
router.put('/:id', validateData(scheduleTianguisUpdateSchema), ScheduleTianguisController.updateScheduleTianguis);
router.delete('/:id', ScheduleTianguisController.deleteScheduleTianguis);

export default router;
