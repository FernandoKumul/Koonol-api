import { Request, Response } from "express";
import SalesStalls from "../models/salesStallsModel";
import { ApiResponse } from "../utils/ApiResponse";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import mongoose from "mongoose";

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

  // Buscar puestos de ventas con paginación, filtros y ordenamiento
  static searchSalesStalls = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";
      const active = req.query.active ? req.query.active === 'true' : undefined;
      const probation = req.query.probation ? req.query.probation === 'true' : undefined;
      const type = req.query.type as string;
      const sellerId = req.query.sellerId as string;
      const subCategoryId = req.query.subCategoryId as string;

      let sortQuery: any = {};
      switch (sort) {
        case "newest":
          sortQuery = { creationDate: "desc" };
          break;
        case "oldest":
          sortQuery = { creationDate: "asc" };
          break;
        case "a-z":
          sortQuery = { name: "asc" };
          break;
        case "z-a":
          sortQuery = { name: "desc" };
          break;
        default:
          sortQuery = { creationDate: "desc" };
      }

      const offset = (page - 1) * limit;
      const searchFilters: any = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };

      if (active !== undefined) {
        searchFilters.active = active;
      }
      if (probation !== undefined) {
        searchFilters.probation = probation;
      }
      if (type) {
        searchFilters.type = type;
      }
      if (sellerId) {
        searchFilters.sellerId = sellerId;
      }
      if (subCategoryId) {
        searchFilters.subCategoryId = subCategoryId;
      }

      const salesStallsList = await SalesStalls.find(searchFilters)
        .populate("subCategoryId")
        .skip(offset)
        .limit(limit)
        .sort(sortQuery);

      const totalSalesStalls = await SalesStalls.countDocuments(searchFilters);

      res.status(200).json(
        ApiResponse.successResponse("Puestos de ventas encontrados", {
          count: totalSalesStalls,
          results: salesStallsList,
        })
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error";
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
        active,
      });

      const savedSalesStalls = await newSalesStalls.save();
      res.status(201).json(ApiResponse.successResponse("Puesto de ventas creado con éxito", savedSalesStalls));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un puesto de ventas por su ID
  static getSalesStallById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const salesStall = await SalesStalls.findById(id);
      if (!salesStall) {
        res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas encontrado", salesStall));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un puesto de ventas
  static updateSalesStall = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { sellerId, subCategoryId, name, photos, description, type, probation, active } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (sellerId) updateData.sellerId = sellerId;
      if (subCategoryId) updateData.subCategoryId = subCategoryId;
      if (name) updateData.name = name;
      if (photos) updateData.photos = photos;
      if (description) updateData.description = description;
      if (type) updateData.type = type;
      if (probation !== undefined) updateData.probation = probation;
      if (active !== undefined) updateData.active = active;

      const updatedSalesStall = await SalesStalls.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedSalesStall) {
        res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas actualizado con éxito", updatedSalesStall));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un puesto de ventas
  static deleteSalesStall = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedSalesStall = await SalesStalls.findByIdAndDelete(id);
      if (!deletedSalesStall) {
        res.status(404).json(ApiResponse.errorResponse("Puesto de ventas no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Puesto de ventas eliminado con éxito", deletedSalesStall));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
