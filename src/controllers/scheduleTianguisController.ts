import { Request, Response } from "express";
import ScheduleTianguis from "../models/scheduleTianguisModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class ScheduleTianguisController {

  static getScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const scheduleTianguis = await ScheduleTianguis.find();
      res.status(200).json(ApiResponse.successResponse("Horarios de Tianguis encontrados", scheduleTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static createScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const { tianguisId, dayWeek, indications, startTime, endTime } = req.body;

      const newSchedule = new ScheduleTianguis({
        tianguisId,
        dayWeek,
        indications,
        startTime,
        endTime
      });

      const savedSchedule = await newSchedule.save();
      res.status(201).json(ApiResponse.successResponse("Horario de Tianguis creado con éxito", savedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  static getScheduleTianguisById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const schedule = await ScheduleTianguis.findById(id);

      if (!schedule) {
        return res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis encontrado", schedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static updateScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  
      const updatedSchedule = await ScheduleTianguis.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedSchedule) {
        return res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis actualizado con éxito", updatedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static deleteScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedSchedule = await ScheduleTianguis.findByIdAndDelete(id);

      if (!deletedSchedule) {
        return res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis eliminado con éxito", deletedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
