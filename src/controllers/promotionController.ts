import { Request, Response } from "express";
import Promotion from "../models/promotionModel";
import { ApiResponse } from "../utils/ApiResponse";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import mongoose from "mongoose";

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

  // Buscar promociones con paginación, filtros y ordenamiento
  static searchPromotions = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";
      const salesStallId = req.query.salesStallId as string;
      const minPay = req.query.minPay ? parseFloat(req.query.minPay as string) : undefined;
      const maxPay = req.query.maxPay ? parseFloat(req.query.maxPay as string) : undefined;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      console.log(minPay, maxPay);

      let sortQuery: any = {};

      switch (sort) {
        case "newest":
          sortQuery = { creationDate: -1 };
          break;
        case "oldest":
          sortQuery = { creationDate: 1 };
          break;
        case "pay-asc":
          sortQuery = { pay: 1 };
          break;
        case "pay-desc":
          sortQuery = { pay: -1 };
          break;
        default:
          sortQuery = { creationDate: -1 };
      }

      const offset = (page - 1) * limit;

      const searchFilters: any = {};

      if (salesStallId) {
        searchFilters.salesStallId = salesStallId;
      }

      if (minPay !== undefined || maxPay !== undefined) {
        searchFilters.pay = {};
        if (minPay !== undefined) {
          searchFilters.pay.$gte = minPay;
        }
        if (maxPay !== undefined) {
          searchFilters.pay.$lte = maxPay;
        }
      }

      if (startDate || endDate) {
        searchFilters.startDate = {};
        if (startDate) {
          searchFilters.startDate.$gte = new Date(startDate);
        }
        if (endDate) {
          searchFilters.startDate.$lte = new Date(endDate);
        }
      }

      const promotionsList = await Promotion
        .aggregate([
          {
            $lookup: {
              from: "salesstalls",
              localField: "salesStallId",
              foreignField: "_id",
              as: "salesStall",
            },
          },
          {
            $match: {
              $and: [
                { "salesStall.name": { $regex: search, $options: "i" } },
                searchFilters,
              ],
            },
          },
          { $unwind: "$salesStall" },
          {
            $facet: {
              data: [
                {
                  $project: {
                    "salesStall._id": 1,
                    "salesStall.name": 1,
                    startDate: 1,
                    endDate: 1,
                    pay: 1,
                    creationDate: 1,
                  },
                },
                { $sort: sortQuery },
                { $skip: offset },
                { $limit: limit },
              ],
              totalPromotions: [{ $count: "count" }],
            }
          }
        ])
      
      res.status(200).json(
        ApiResponse.successResponse("Promociones encontradas", {
          count: promotionsList[0].totalPromotions[0]?.count || 0,
          results: promotionsList[0].data,
        })
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error";
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
        pay,
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
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const promotion = await Promotion.findById(id).populate({ path: "salesStallId", select: "name" });
      if (!promotion) {
        res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Promoción encontrada", promotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una promoción
  static updatePromotion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { salesStallId, startDate, endDate, pay } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (salesStallId) updateData.salesStallId = salesStallId;
      if (startDate) updateData.startDate = startDate;
      if (endDate) updateData.endDate = endDate;
      if (pay !== undefined) updateData.pay = pay;

      const updatedPromotion = await Promotion.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedPromotion) {
        res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Promoción actualizada con éxito", updatedPromotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una promoción
  static deletePromotion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedPromotion = await Promotion.findByIdAndDelete(id);
      if (!deletedPromotion) {
        res.status(404).json(ApiResponse.errorResponse("Promoción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Promoción eliminada con éxito", deletedPromotion));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
