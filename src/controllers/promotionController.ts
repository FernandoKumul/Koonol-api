import { Request, Response } from "express";
import Promotion from "../models/promotionModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class PromotionsController {

  // Obtener todas las promociones
  static getAllPromotions = async (req: Request, res: Response) => {
    try {
      const promotions = await Promotion.find();
      res.status(200).json(ApiResponse.successResponse("Promociones encontradas", promotions));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una nueva promoción
  static createPromotion = async (req: Request, res: Response) => {
    try {
      const { salesStallId, startDate, endDate, pay } = req.body;
      
      const newPromotion = new Promotion({
        salesStallId,
        startDate,
        endDate,
        pay
      });

      const savedPromotion = await newPromotion.save();
      res.status(201).json(ApiResponse.successResponse("Promoción creada con éxito", savedPromotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una promoción por su ID
  static getPromotionById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const promotion = await Promotion.findById(id);

      if (!promotion) {
        return res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Promoción encontrada", promotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una promoción
  static updatePromotion = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedPromotion) {
        return res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Promoción actualizada con éxito", updatedPromotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una promoción
  static deletePromotion = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedPromotion = await Promotion.findByIdAndDelete(id);

      if (!deletedPromotion) {
        return res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Promoción eliminada con éxito", deletedPromotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
