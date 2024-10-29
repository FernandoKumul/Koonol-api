import express from "express";
import LocationSalesStallsController from "../controllers/locationSalesStallsController";
import { validateData } from "../middleware/validationMiddleware";
import { locationSalesStallsSchema } from "../schemas/LocationSalesStallsSchema/locationSalesStallsSchema";

const router = express.Router();

router.get('/', LocationSalesStallsController.getAllLocationSalesStalls);
router.post('/', validateData(locationSalesStallsSchema), LocationSalesStallsController.createLocationSalesStalls);

export default router;
