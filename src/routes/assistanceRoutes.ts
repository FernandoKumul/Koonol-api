import express from "express";
import AssistanceController from "../controllers/assistanceController";
import { validateData } from "../middleware/validationMiddleware";
import { assistanceSchema } from "../schemas/assistanceSchema";

const router = express.Router();

router.get('/', AssistanceController.getAllAssistances);
router.post('/', validateData(assistanceSchema), AssistanceController.createAssistance);

export default router;
