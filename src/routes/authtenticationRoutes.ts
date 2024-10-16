import express from 'express';
import AuthController from '../controllers/authenticactionController';
import { validateData } from '../middleware/validationMiddleware';
import { loginSchema } from '../schemas/authenticacionSchema';

const router = express.Router();

router.post('/login', validateData(loginSchema), AuthController.login);

export default router;