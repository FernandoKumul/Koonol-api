import { Request, Response } from "express";
import ScheduleTianguis from "../models/scheduleTianguisModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

export default class ScheduleTianguisController {

  // Obtener todos los horarios de tianguis
  static getScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const scheduleTianguis = await ScheduleTianguis.find();
      res.status(200).json(ApiResponse.successResponse("Horarios de Tianguis encontrados", scheduleTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo horario de tianguis
  static createScheduleTianguis = async (req: Request, res: Response) => {
    try {
      const { tianguisId, dayWeek, indications, startTime, endTime } = req.body;

      const newSchedule = new ScheduleTianguis({
        tianguisId,
        dayWeek,
        indications,
        startTime,
        endTime,
      });

      const savedSchedule = await newSchedule.save();
      res.status(201).json(ApiResponse.successResponse("Horario de Tianguis creado con éxito", savedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un horario de tianguis por su ID
  static getScheduleTianguisById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const schedule = await ScheduleTianguis.findById(id);
      if (!schedule) {
        res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis encontrado", schedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un horario de tianguis
  static updateScheduleTianguis = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { tianguisId, dayWeek, indications, startTime, endTime } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (tianguisId) updateData.tianguisId = tianguisId;
      if (dayWeek) updateData.dayWeek = dayWeek;
      if (indications) updateData.indications = indications;
      if (startTime) updateData.startTime = startTime;
      if (endTime) updateData.endTime = endTime;

      const updatedSchedule = await ScheduleTianguis.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedSchedule) {
        res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis actualizado con éxito", updatedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un horario de tianguis
  static deleteScheduleTianguis = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedSchedule = await ScheduleTianguis.findByIdAndDelete(id);
      if (!deletedSchedule) {
        res.status(404).json(ApiResponse.errorResponse("Horario de Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Horario de Tianguis eliminado con éxito", deletedSchedule));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
