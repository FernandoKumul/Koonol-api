import express from "express";
import RolController from "../controllers/rolController";
import { validateData } from "../middleware/validationMiddleware";
import { rolSchema } from "../schemas/RolSchema/rolSchema";

const router = express.Router();

router.get('/', RolController.getRoles);
router.post('/', validateData(rolSchema), RolController.createRole);

export default router;
