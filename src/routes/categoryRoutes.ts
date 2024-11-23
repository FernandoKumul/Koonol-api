import express from "express";
import CategoryController from "../controllers/categoryController";
import { validateData } from "../middleware/validationMiddleware";
import { categoryUpdateSchema } from "../schemas/CategorySchema/categoryUpdateSchema";
import { categoryCreateSchema } from "../schemas/CategorySchema/categoryCreateSchema";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/all', authMiddleware, CategoryController.getAllCategories);
router.post('/', authMiddleware, validateData(categoryCreateSchema), CategoryController.createCategory);
router.get('/', authMiddleware, CategoryController.searchCategories);
router.get('/:id',authMiddleware, CategoryController.getCategoryById);
router.put('/:id', authMiddleware, validateData(categoryUpdateSchema), CategoryController.updateCategory);
router.delete('/:id', authMiddleware, CategoryController.deleteCategory);

export default router;
