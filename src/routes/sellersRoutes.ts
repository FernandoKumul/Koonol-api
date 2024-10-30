import express from "express";
import SellersController from "../controllers/sellersController";
import { validateData } from "../middleware/validationMiddleware";
import { sellerSchema } from "../schemas/SellersSchema/sellersSchema";
import { sellerUpdateSchema } from "../schemas/SellersSchema/sellersUpdateSchema";

const router = express.Router();

router.get('/all', SellersController.getAllSellers);
router.post('/', validateData(sellerSchema), SellersController.createSeller);
router.get('/', SellersController.searchSellers);
router.get('/:id', SellersController.getSellerById);
router.put('/:id', validateData(sellerUpdateSchema), SellersController.updateSeller);
router.delete('/:id', SellersController.deleteSeller);

export default router;
