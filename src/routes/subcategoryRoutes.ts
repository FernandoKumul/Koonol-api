import express from "express";
import SubcategoryController from "../controllers/subcategoryController";
import { validateData } from "../middleware/validationMiddleware";
import { subcategorySchema } from "../schemas/SubcategorySchema/subcategorySchema";
import { subcategoryUpdateSchema } from "../schemas/SubcategorySchema/subcategoryUpdateSchema";

const router = express.Router();

router.get('/', SubcategoryController.getAllSubcategories);
router.post('/', validateData(subcategorySchema), SubcategoryController.createSubcategory);
router.get('/:id', SubcategoryController.getSubcategoryById)
router.put('/:id', validateData(subcategoryUpdateSchema), SubcategoryController.updateSubcategory);


export default router;
