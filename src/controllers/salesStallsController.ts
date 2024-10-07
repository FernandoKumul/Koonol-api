import { Request, Response } from "express";
import SalesStalls from "../models/salesStallsModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class SalesStallsController {

  // Obtener todos los puestos de ventas
  static getAllSalesStalls = async (req: Request, res: Response) => {
    try {
      const salesStalls = await SalesStalls.find();
      res.status(200).json(ApiResponse.successResponse("Puestos de ventas encontrados", salesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo puesto de ventas
  static createSalesStalls = async (req: Request, res: Response) => {
    try {
      const { sellerId, subCategoryId, name, photos, description, type, probation, active } = req.body;

      const newSalesStalls = new SalesStalls({
        sellerId,
        subCategoryId,
        name,
        photos,
        description,
        type,
        probation,
        active
      });

      const savedSalesStalls = await newSalesStalls.save();
      res.status(201).json(ApiResponse.successResponse("Puesto de ventas creado con éxito", savedSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un puesto de ventas por su ID
  static getSalesStallsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const salesStalls = await SalesStalls.findById(id);

      if (!salesStalls) {
        return res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas encontrado", salesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un puesto de ventas
  static updateSalesStalls = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const updatedSalesStalls = await SalesStalls.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedSalesStalls) {
        return res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas actualizado con éxito", updatedSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un puesto de ventas
  static deleteSalesStalls = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedSalesStalls = await SalesStalls.findByIdAndDelete(id);

      if (!deletedSalesStalls) {
        return res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas eliminado con éxito", deletedSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
