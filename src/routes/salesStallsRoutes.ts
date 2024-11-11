import express from "express";
import SalesStallsController from "../controllers/salesStallsController";
import { validateData } from "../middleware/validationMiddleware";
import { salesStallsSchema } from "../schemas/SalesStallsSchema/salesStallsSchema";
import { salesStallsUpdateSchema } from "../schemas/SalesStallsSchema/salesStallsUpdateSchema";

const router = express.Router();

router.get('/all', SalesStallsController.getAllSalesStalls);
router.post('/', validateData(salesStallsSchema), SalesStallsController.createSalesStalls);
router.get('/', SalesStallsController.searchSalesStalls);
router.get('/:id', SalesStallsController.getSalesStallById);
router.put('/:id', validateData(salesStallsUpdateSchema), SalesStallsController.updateSalesStall);
router.delete('/:id', SalesStallsController.deleteSalesStall);

export default router;
