import express from "express";
import MenuController from "../controllers/menuController";
import { validateData } from "../middleware/validationMiddleware";
import { menuSchema } from "../schemas/MenuSchema/menuSchema";
import { menuUpdateSchema } from "../schemas/MenuSchema/menuUpdateSchema";

const router = express.Router();

router.get('/', MenuController.getMenus);
router.post('/', validateData(menuSchema), MenuController.createMenu);
router.get('/:id', MenuController.getMenuById);
router.put('/:id', validateData(menuUpdateSchema), MenuController.updateMenu);
router.delete('/:id', MenuController.deleteMenu);

export default router;
