import express from 'express';
import UserControler from '../controllers/userController';

const router = express.Router();

router.get('/', UserControler.getUsers);   
router.post('/', UserControler.createUser);

export default router;