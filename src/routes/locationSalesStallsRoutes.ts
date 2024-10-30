import express from "express";
import LocationSalesStallsController from "../controllers/locationSalesStallsController";
import { validateData } from "../middleware/validationMiddleware";
import { locationSalesStallsSchema } from "../schemas/LocationSalesStallsSchema/locationSalesStallsSchema";
import { locationSalesStallsUpdateSchema } from "../schemas/LocationSalesStallsSchema/locationSalesStallsUpdateSchema";

const router = express.Router();

router.get('/', LocationSalesStallsController.getAllLocationSalesStalls);
router.post('/', validateData(locationSalesStallsSchema), LocationSalesStallsController.createLocationSalesStalls);
router.get('/:id', LocationSalesStallsController.getLocationSalesStallsById);
router.put('/:id', validateData(locationSalesStallsUpdateSchema), LocationSalesStallsController.updateLocationSalesStalls);
router.delete('/:id', LocationSalesStallsController.deleteLocationSalesStalls);

export default router;
