import express from "express";
import AssistanceController from "../controllers/assistanceController";
import { validateData } from "../middleware/validationMiddleware";
import { assistanceSchema } from "../schemas/AssitanceSchema/assistanceSchema";
import { assistanceUpdateSchema } from "../schemas/AssitanceSchema/assistanceUpdateSchema";

const router = express.Router();

router.get('/', AssistanceController.getAllAssistances);
router.post('/', validateData(assistanceSchema), AssistanceController.createAssistance);
router.get('/:id', AssistanceController.getAssistanceById);
router.put('/:id', validateData(assistanceUpdateSchema), AssistanceController.updateAssistance);
router.delete('/:id', AssistanceController.deleteAssistance);

export default router;
