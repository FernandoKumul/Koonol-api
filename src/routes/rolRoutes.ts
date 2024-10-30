import express from "express";
import RolController from "../controllers/rolController";
import { validateData } from "../middleware/validationMiddleware";
import { rolSchema } from "../schemas/RolSchema/rolSchema";
import { rolUpdateSchema } from "../schemas/RolSchema/rolUpdateSchema";

const router = express.Router();

router.get('/', RolController.getRoles);
router.post('/', validateData(rolSchema), RolController.createRole);
router.get('/:id', RolController.getRoleById);
router.put('/:id', validateData(rolUpdateSchema), RolController.updateRole);
router.delete('/:id', RolController.deleteRole);

export default router;
