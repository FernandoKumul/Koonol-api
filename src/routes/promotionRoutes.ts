import express from "express";
import PromotionsController from "../controllers/promotionController";
import { validateData } from "../middleware/validationMiddleware";
import { promotionSchema } from "../schemas/PromotionSchema/promotionSchema";
import { promotionUpdateSchema } from "../schemas/PromotionSchema/promotionUpdateSchema";

const router = express.Router();

router.get('/', PromotionsController.getAllPromotions);
router.post('/', validateData(promotionSchema), PromotionsController.createPromotion);
router.get('/all', PromotionsController.searchPromotions);
router.get('/:id', PromotionsController.getPromotionById);
router.put('/:id', validateData(promotionUpdateSchema), PromotionsController.updatePromotion);
router.delete('/:id', PromotionsController.deletePromotion);

export default router;
