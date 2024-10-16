import express from 'express';
import UserControler from '../controllers/userController';
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema } from '../schemas/userSchema';

const router = express.Router();

router.get('/', UserControler.getUsers);   
router.post('/', validateData(userRegistrationSchema), UserControler.createUser);

export default router;