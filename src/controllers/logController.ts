import { Request, Response } from "express";
import Log from "../models/logModel";
import { ApiResponse } from "../utils/ApiResponse";
import { decrypt } from "../utils/encryption";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import mongoose from "mongoose";

export default class LogController {
  // Desencriptar el campo `response`
  private static decryptResponse(log: any) {
    if (log.response && log.response.data) {
      const { iv, encryptedData } = log.response.data; // Acceder al campo cifrado
      if (iv && encryptedData) {
        try {
          const decryptedData = JSON.parse(decrypt(encryptedData, iv));
          log.response.data = decryptedData; // Reemplazar con el valor descifrado
        } catch (error) {
          console.error("Error al descifrar el campo data:", error);
          log.response.data = { error: "No se pudo descifrar el contenido de data." };
        }
      } else {
        log.response.data = { error: "No hay datos cifrados disponibles en data." };
      }
    }
    return log;
  }
  

  // Obtener todos los logs
  static getAllLogs = async (req: Request, res: Response) => {
    try {
      let logs = await Log.find();
      logs = logs.map(LogController.decryptResponse); 

      res.status(200).json(ApiResponse.successResponse("Logs encontrados", logs));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Buscar logs con paginación, filtros y ordenamiento
  static searchLogs = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const userId = req.query.userId as string || "";
      const ipAddress = req.query.ipAddress as string || "";
      const sort = (req.query.sort as string) || "newest";

      let sortQuery = {};
      switch (sort) {
        case "newest":
          sortQuery = { timestamp: "desc" };
          break;
        case "oldest":
          sortQuery = { timestamp: "asc" };
          break;
        default:
          sortQuery = { timestamp: "desc" };
      }

      const offset = (page - 1) * limit;

      const searchFilters: any = {};
      if (userId) searchFilters.userId = userId;
      if (ipAddress) searchFilters.ipAddress = { $regex: ipAddress, $options: "i" };

      let logsList = await Log.find(searchFilters)
        .skip(offset)
        .limit(limit)
        .sort(sortQuery);

      const totalLogs = await Log.countDocuments(searchFilters);
      logsList = logsList.map(LogController.decryptResponse); 

      res.status(200).json(
        ApiResponse.successResponse("Logs encontrados", {
          count: totalLogs,
          results: logsList,
        })
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Obtener un log por su ID
  static getLogById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      let log = await Log.findById(id);
      if (!log) {
        res.status(404).json(ApiResponse.errorResponse("Log no encontrado", 404));
        return;
      }

      log = LogController.decryptResponse(log); 
      res.status(200).json(ApiResponse.successResponse("Log encontrado", log));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
