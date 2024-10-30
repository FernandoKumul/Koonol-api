import { Request, Response } from "express";
import LocationSalesStalls from "../models/locationSalesStallsModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

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
        markerMap,
      });

      const savedLocation = await newLocationSalesStalls.save();
      res.status(201).json(ApiResponse.successResponse("Ubicación de puesto de ventas creada con éxito", savedLocation));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un registro de LocationSalesStalls por su ID
  static getLocationSalesStallsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const locationSalesStalls = await LocationSalesStalls.findById(id);
      if (!locationSalesStalls) {
        res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas encontrada", locationSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un registro de LocationSalesStalls
  static updateLocationSalesStalls = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { salesStallsId, tianguisId, markerMap } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (salesStallsId) updateData.salesStallsId = salesStallsId;
      if (tianguisId) updateData.tianguisId = tianguisId;
      if (markerMap) updateData.markerMap = markerMap;

      const updatedLocationSalesStalls = await LocationSalesStalls.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedLocationSalesStalls) {
        res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas actualizada con éxito", updatedLocationSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un registro de LocationSalesStalls
  static deleteLocationSalesStalls = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedLocationSalesStalls = await LocationSalesStalls.findByIdAndDelete(id);
      if (!deletedLocationSalesStalls) {
        res.status(404).json(ApiResponse.errorResponse("Ubicación de puesto de ventas no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Ubicación de puesto de ventas eliminada con éxito", deletedLocationSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
