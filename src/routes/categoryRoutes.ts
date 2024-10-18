import express from "express";
import CategoryController from "../controllers/categoryController";
import { validateData } from "../middleware/validationMiddleware";
import { categorySchema } from "../schemas/categorySchema";

const router = express.Router();

router.get('/', CategoryController.searchCategories);
router.get('/all', CategoryController.getAllCategories);
router.post('/', validateData(categorySchema), CategoryController.createCategory);

export default router;
