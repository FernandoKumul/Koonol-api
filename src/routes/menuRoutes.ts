import express from "express";
import MenuController from "../controllers/menuController";
import { validateData } from "../middleware/validationMiddleware";
import { menuSchema } from "../schemas/menuSchema";

const router = express.Router();

router.get('/', MenuController.getMenus);
router.post('/', validateData(menuSchema), MenuController.createMenu);

export default router;
