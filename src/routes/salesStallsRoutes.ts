import express from "express";
import SalesStallsController from "../controllers/salesStallsController";
import { validateData } from "../middleware/validationMiddleware";
import { salesStallsSchema } from "../schemas/salesStallsSchema";

const router = express.Router();

router.get('/', SalesStallsController.searchSalesStalls);
router.get('/all', SalesStallsController.getAllSalesStalls);
router.post('/', validateData(salesStallsSchema), SalesStallsController.createSalesStalls);

export default router;
