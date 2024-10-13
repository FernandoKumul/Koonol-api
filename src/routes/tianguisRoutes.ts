import express from 'express';
import TianguisController from '../controllers/tianguisController';
import { validateData } from '../middleware/validationMiddleware';
import { tianguisSchema } from '../schemas/tianguisSchema';
import { authMiddleware } from "../middleware/authMiddleware";  
import { permissionMiddleware } from "../middleware/permissionsMiddleware";  

const router = express.Router();

// Usar ObjectId de menú y acción
router.get('/', authMiddleware, permissionMiddleware('670b1c6c7c831af6551fec3b', '670b1beed58113ba1d8d12c2'), TianguisController.getTianguis);
router.post('/', authMiddleware, validateData(tianguisSchema), permissionMiddleware('670b1c6c7c831af6551fec3b', '670b1bf6d58113ba1d8d12c4'), TianguisController.createTianguis);

export default router;
