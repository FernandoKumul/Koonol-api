import express from "express";
import PermissionController from "../controllers/permissionController";
import { validateData } from "../middleware/validationMiddleware";
import { permissionSchema } from "../schemas/permissionSchema";

const router = express.Router();

router.get('/', PermissionController.getPermissions);
router.post('/', validateData(permissionSchema), PermissionController.createPermission);

export default router;
