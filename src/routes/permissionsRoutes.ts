import express from "express";
import PermissionController from "../controllers/permissionController";
import { validateData } from "../middleware/validationMiddleware";
import { permissionSchema } from "../schemas/PermissionSchema/permissionSchema";
import { permissionUpdateSchema } from "../schemas/PermissionSchema/permissionUpdateSchema";

const router = express.Router();

router.get('/', PermissionController.getPermissions);
router.post('/', validateData(permissionSchema), PermissionController.createPermission);
router.get('/:id', PermissionController.getPermissionById);
router.put('/:id', validateData(permissionUpdateSchema), PermissionController.updatePermission);
router.delete('/:id', PermissionController.deletePermission);

export default router;
