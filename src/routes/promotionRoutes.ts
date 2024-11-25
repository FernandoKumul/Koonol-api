import express from "express";
import PromotionsController from "../controllers/promotionController";
import { validateData } from "../middleware/validationMiddleware";
import { promotionSchema } from "../schemas/PromotionSchema/promotionSchema";
import { promotionUpdateSchema } from "../schemas/PromotionSchema/promotionUpdateSchema";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/all', authMiddleware, PromotionsController.getAllPromotions);
router.get('/', authMiddleware, PromotionsController.searchPromotions);
router.post('/', authMiddleware, validateData(promotionSchema), PromotionsController.createPromotion);
router.get('/:id', authMiddleware, PromotionsController.getPromotionById);
router.put('/:id', authMiddleware, validateData(promotionUpdateSchema), PromotionsController.updatePromotion);
router.delete('/:id', authMiddleware, PromotionsController.deletePromotion);

export default router;
