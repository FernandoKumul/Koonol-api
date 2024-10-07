import { Request, Response } from "express";
import Assistance from "../models/assistanceModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class AssistanceController {

  // Obtener todas las asistencias
  static getAllAssistances = async (req: Request, res: Response) => {
    try {
      const assistances = await Assistance.find();
      res.status(200).json(ApiResponse.successResponse("Asistencias encontradas", assistances));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una nueva asistencia
  static createAssistance = async (req: Request, res: Response) => {
    try {
      const { locationSalesStallsId, status, tariff } = req.body;

      const newAssistance = new Assistance({
        locationSalesStallsId,
        status,
        tariff
      });

      const savedAssistance = await newAssistance.save();
      res.status(201).json(ApiResponse.successResponse("Asistencia creada con éxito", savedAssistance));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una asistencia por su ID
  static getAssistanceById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const assistance = await Assistance.findById(id);

      if (!assistance) {
        return res.status(404).json(ApiResponse.errorResponse("Asistencia no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Asistencia encontrada", assistance));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una asistencia
  static updateAssistance = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const updatedAssistance = await Assistance.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedAssistance) {
        return res.status(404).json(ApiResponse.errorResponse("Asistencia no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Asistencia actualizada con éxito", updatedAssistance));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una asistencia
  static deleteAssistance = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedAssistance = await Assistance.findByIdAndDelete(id);

      if (!deletedAssistance) {
        return res.status(404).json(ApiResponse.errorResponse("Asistencia no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Asistencia eliminada con éxito", deletedAssistance));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
