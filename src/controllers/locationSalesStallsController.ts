import { Request, Response } from "express";
import LocationSalesStalls from "../models/locationSalesStallsModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class LocationSalesStallsController {

  // Obtener todos los registros de LocationSalesStalls
  static getAllLocationSalesStalls = async (req: Request, res: Response) => {
    try {
      const locationSalesStalls = await LocationSalesStalls.find();
      res.status(200).json(ApiResponse.successResponse("Ubicaciones de puestos de ventas encontradas", locationSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo registro de LocationSalesStalls
  static createLocationSalesStalls = async (req: Request, res: Response) => {
    try {
      const { salesStallsId, tianguisId, markerMap } = req.body;

      const newLocationSalesStalls = new LocationSalesStalls({
        salesStallsId,
        tianguisId,
        markerMap
      });

      const savedLocation = await newLocationSalesStalls.save();
      res.status(201).json(ApiResponse.successResponse("Ubicación de puesto de ventas creada con éxito", savedLocation));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un registro por su ID
  static getLocationSalesStallsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const locationSalesStalls = await LocationSalesStalls.findById(id);

      if (!locationSalesStalls) {
        return res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas encontrada", locationSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un registro de LocationSalesStalls
  static updateLocationSalesStalls = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedLocation = await LocationSalesStalls.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedLocation) {
        return res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas actualizada con éxito", updatedLocation));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un registro de LocationSalesStalls
  static deleteLocationSalesStalls = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedLocation = await LocationSalesStalls.findByIdAndDelete(id);

      if (!deletedLocation) {
        return res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas eliminada con éxito", deletedLocation));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
