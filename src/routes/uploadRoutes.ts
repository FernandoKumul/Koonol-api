import express from 'express';
import multer from 'multer';
import UploadController from '../controllers/uploadController';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/image', upload.single('image') ,UploadController.uploadImage)

export default router;