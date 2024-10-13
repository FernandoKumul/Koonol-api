import express from "express";
import ActionController from "../controllers/actionController";
import { validateData } from "../middleware/validationMiddleware";
import { actionSchema } from "../schemas/actionSchema";

const router = express.Router();

router.get('/', ActionController.getActions);
router.post('/', validateData(actionSchema), ActionController.createAction);

export default router;
