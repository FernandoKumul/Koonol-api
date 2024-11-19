import express from "express";
import LogController from "../controllers/logController";

const router = express.Router();

// Obtener todos los logs
router.get('/all', LogController.getAllLogs);

// Buscar logs con filtros, paginación y ordenamiento
router.get('/', LogController.searchLogs);

// Obtener un log específico por su ID
router.get('/:id', LogController.getLogById);

export default router;
