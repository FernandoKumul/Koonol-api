import express from 'express';
import UserControler from '../controllers/userController';
import { validateData } from '../middleware/validationMiddleware';
import { userRegistrationSchema } from '../schemas/UserSchema/userSchema';
import { userUpdateSchema } from '../schemas/UserSchema/userUpdateSchema';

const router = express.Router();

router.get('/', UserControler.searchUsers);
router.get('/all', UserControler.getUsers);   
router.post('/', validateData(userRegistrationSchema), UserControler.createUser);
router.delete('/:id', UserControler.deleteUser);
router.get('/:id', UserControler.getUserById);
router.put('/:id', validateData(userUpdateSchema), UserControler.updateUser);

export default router;