import express from "express";
import SubcategoryController from "../controllers/subcategoryController";
import { validateData } from "../middleware/validationMiddleware";
import { subcategorySchema } from "../schemas/subcategorySchema";
import { rolSchema } from "../schemas/rolSchema";

const router = express.Router();

router.get('/', SubcategoryController.getAllSubcategories);
router.post('/', validateData(rolSchema), SubcategoryController.createSubcategory);

export default router;
