import express from "express";
import TianguisController from "../controllers/tianguisController";
import { validateData } from "../middleware/validationMiddleware";
import { tianguisSchema } from "../schemas/TianguisSchema/tianguisSchema";
import { tianguisUpdateSchema } from "../schemas/TianguisSchema/tianguisUpdateSchema";

const router = express.Router();

router.get('/all', TianguisController.getTianguis);
router.post('/', validateData(tianguisSchema), TianguisController.createTianguis);
router.get('/', TianguisController.searchTianguis);
router.get('/:id', TianguisController.getTianguisById);
router.put('/:id', validateData(tianguisUpdateSchema), TianguisController.updateTianguis);
router.delete('/:id', TianguisController.deleteTianguis);

export default router;
