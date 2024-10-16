import { Request, Response } from "express";
import Tianguis from "../models/tianguisModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class TianguisController {

  // Obtener todos los tianguis
  static getTianguis = async (req: Request, res: Response) => {
    try {
      const tianguis = await Tianguis.find();
      res.status(200).json(ApiResponse.successResponse("Tianguis encontrados", tianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo tianguis
  static createTianguis = async (req: Request, res: Response) => {
    try {
      const { userId, name, color, dayWeek, photo, indications, markerMap, startTime, endTime, locality, active } = req.body;
      const newTianguis = new Tianguis({
        userId,
        name,
        color,
        dayWeek,
        photo,
        indications,
        markerMap,
        startTime,
        endTime,
        locality,
        active
      });
      const savedTianguis = await newTianguis.save();
      res.status(201).json(ApiResponse.successResponse("Tianguis creado con éxito", savedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un tianguis por ID
  static getTianguisById = async (req: Request, res: Response) => {
    try {
      const tianguis = await Tianguis.findById(req.params.id);
      if (!tianguis) {
        return res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
      }
      res.status(200).json(ApiResponse.successResponse("Tianguis encontrado", tianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un tianguis
  static updateTianguis = async (req: Request, res: Response) => {
    try {
      const updatedTianguis = await Tianguis.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTianguis) {
        return res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
      }
      res.status(200).json(ApiResponse.successResponse("Tianguis actualizado con éxito", updatedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un tianguis
  static deleteTianguis = async (req: Request, res: Response) => {
    try {
      const deletedTianguis = await Tianguis.findByIdAndDelete(req.params.id);
      if (!deletedTianguis) {
        return res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
      }
      res.status(200).json(ApiResponse.successResponse("Tianguis eliminado con éxito", deletedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
