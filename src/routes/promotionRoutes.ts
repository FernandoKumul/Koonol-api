import express from "express";
import PromotionsController from "../controllers/promotionController";
import { validateData } from "../middleware/validationMiddleware";
import { promotionSchema } from "../schemas/promotionSchema";

const router = express.Router();

router.get('/', PromotionsController.getAllPromotions);
router.post('/', validateData(promotionSchema), PromotionsController.createPromotion);

export default router;
