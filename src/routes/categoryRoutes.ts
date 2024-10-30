import express from "express";
import CategoryController from "../controllers/categoryController";
import { validateData } from "../middleware/validationMiddleware";
import { categorySchema } from "../schemas/CategorySchema/categorySchema";
import { categoryUpdateSchema } from "../schemas/CategorySchema/categoryUpdateSchema";

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', validateData(categorySchema), CategoryController.createCategory);
router.get('/all', CategoryController.searchCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', validateData(categoryUpdateSchema), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;
