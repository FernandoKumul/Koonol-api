import { Request, Response } from "express";
import Tianguis from "../models/tianguisModel";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

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

  // Buscar tianguis con filtros, paginación y ordenamiento
  static searchTianguis = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";
      const active = req.query.active ? req.query.active === 'true' : undefined;
      const dayWeek = req.query.dayWeek as string;
      const userId = req.query.userId as string;

      let sortQuery = {};
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
          { indications: { $regex: search, $options: "i" } },
          { locality: { $regex: search, $options: "i" } },
        ],
      };

      if (active !== undefined) {
        searchFilters.active = active;
      }
      if (dayWeek) {
        searchFilters.dayWeek = dayWeek;
      }
      if (userId) {
        searchFilters.userId = userId;
      }

      const tianguisList = await Tianguis.find(searchFilters)
        .skip(offset)
        .limit(limit)
        .sort(sortQuery);

      const totalTianguis = await Tianguis.countDocuments(searchFilters);

      res.status(200).json(
        ApiResponse.successResponse("Tianguis encontrados", {
          count: totalTianguis,
          results: tianguisList,
        })
      );
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
        active,
      });
      const savedTianguis = await newTianguis.save();
      res.status(201).json(ApiResponse.successResponse("Tianguis creado con éxito", savedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un tianguis por su ID
  static getTianguisById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const tianguis = await Tianguis.findById(id);
      if (!tianguis) {
        res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Tianguis encontrado", tianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un tianguis
  static updateTianguis = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId, name, color, dayWeek, photo, indications, markerMap, startTime, endTime, locality, active } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (userId) updateData.userId = userId;
      if (name) updateData.name = name;
      if (color) updateData.color = color;
      if (dayWeek) updateData.dayWeek = dayWeek;
      if (photo) updateData.photo = photo;
      if (indications) updateData.indications = indications;
      if (markerMap) updateData.markerMap = markerMap;
      if (startTime) updateData.startTime = startTime;
      if (endTime) updateData.endTime = endTime;
      if (locality) updateData.locality = locality;
      if (active !== undefined) updateData.active = active;

      const updatedTianguis = await Tianguis.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedTianguis) {
        res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Tianguis actualizado con éxito", updatedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un tianguis
  static deleteTianguis = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedTianguis = await Tianguis.findByIdAndDelete(id);
      if (!deletedTianguis) {
        res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Tianguis eliminado con éxito", deletedTianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
