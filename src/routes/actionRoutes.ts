import express from "express";
import ActionController from "../controllers/actionController";
import { validateData } from "../middleware/validationMiddleware";
import { actionSchema } from "../schemas/ActionSchema/actionSchema";
import { actionUpdateSchema } from "../schemas/ActionSchema/actionUpdateSchema";

const router = express.Router();

router.get('/', ActionController.getActions);
router.post('/', validateData(actionSchema), ActionController.createAction);
router.get('/:id', ActionController.getActionById);
router.put('/:id', validateData(actionUpdateSchema), ActionController.updateAction);
router.delete('/:id', ActionController.deleteAction);

export default router;
