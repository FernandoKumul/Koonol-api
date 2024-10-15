import express from 'express';
import UserControler from '../controllers/userController';
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema } from '../schemas/userSchema';

const router = express.Router();

router.get('/', UserControler.searchUsers);
router.get('/all', UserControler.getUsers);   
router.post('/', validateData(userRegistrationSchema), UserControler.createUser);
router.delete('/:id', UserControler.deleteUser);

export default router;