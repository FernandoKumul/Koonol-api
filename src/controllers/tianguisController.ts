import { Request, Response } from "express";
import Tianguis from "../models/tianguisModel";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
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
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error";
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
