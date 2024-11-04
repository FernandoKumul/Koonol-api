import express from 'express';
import AuthController from '../controllers/authenticactionController';
import { validateData } from '../middleware/validationMiddleware';
import { loginSchema } from '../schemas/AuthenticationSchema/authenticacionSchema';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', validateData(loginSchema), AuthController.login);
router.get('/validate',authMiddleware, AuthController.validateToken);

export default router;