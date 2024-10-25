import express from "express";
import SellersController from "../controllers/sellersController";
import { validateData } from "../middleware/validationMiddleware";
import { sellerSchema } from "../schemas/sellersSchema";

const router = express.Router();

router.get('/', SellersController.searchSellers);
router.get('/all', SellersController.getAllSellers);
router.get('/:id', SellersController.getSellerById);
router.post('/', validateData(sellerSchema), SellersController.createSeller);
router.delete('/:id', SellersController.deleteSeller);

export default router;
