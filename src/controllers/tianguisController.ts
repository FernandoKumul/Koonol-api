import { Request, Response } from "express";
import Tianguis from "../models/tianguisModel";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";
import ScheduleTianguis from "../models/scheduleTianguisModel";

export default class TianguisController {

  // Obtener todos los tianguis
  static getTianguis = async (req: Request, res: Response) => {
    try {
      const tianguis = await Tianguis.find().populate("schedule"); // Usar el campo virtual definido
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
      const active = req.query.active ? req.query.active === "true" : undefined;
      const userId = req.query.userId as string;
  
      // Definir el ordenamiento
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
  
      // Definir los filtros de búsqueda
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
      if (userId) {
        searchFilters.userId = userId;
      }
  
      // Calcular el offset para la paginación
      const offset = (page - 1) * limit;
  
      // Obtener la lista de tianguis con horarios
      const tianguisList = await Tianguis.find(searchFilters)
        .skip(offset)
        .limit(limit)
        .sort(sortQuery)
        .populate("schedule");
  
      // Contar el total de documentos que coinciden con los filtros
      const totalTianguis = await Tianguis.countDocuments(searchFilters);
  
      // Responder con los resultados
      res.status(200).json(
        ApiResponse.successResponse("Tianguis encontrados", {
          count: totalTianguis,
          results: tianguisList,
        })
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      console.error("Error en searchTianguis:", errorMessage); // Log del error para depuración
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
  

   // Obtener un tianguis por su ID
   static getTianguisById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      // Validar el ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }
  
      // Buscar el tianguis por ID e incluir los horarios con populate
      const tianguis = await Tianguis.findById(id).populate("schedule");
  
      // Verificar si el tianguis existe
      if (!tianguis) {
        console.log("Tianguis no encontrado para el ID:", id);
        res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Tianguis encontrado", tianguis));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      console.error("Error al obtener el tianguis por ID:", errorMessage);
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
  
  
  // Crear un nuevo tianguis
      static createTianguis = async (req: Request, res: Response) => {
        try {
          const {
            userId,
            name,
            color,
            photo,
            indications,
            markerMap,
            locality,
            active,
          } = req.body;
      
          // Crear el tianguis
          const newTianguis = new Tianguis({
            userId,
            name,
            color,
            photo,
            indications,
            markerMap,
            locality,
            active,
          });
      
          const savedTianguis = await newTianguis.save();
          res.status(201).json(
            ApiResponse.successResponse("Tianguis y horario creados con éxito", {
              ...savedTianguis.toObject(),
            })
          );
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
          res.status(400).json(ApiResponse.errorResponse(errorMessage));
        }
      };
      

 

  // Actualizar un tianguis
  static updateTianguis = async (req: Request, res: Response) => {
    const { id } = req.params; // ID del tianguis
    const {
      userId,
      name,
      color,
      photo,
      indications,
      markerMap,
      locality,
      active,
    } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (userId) updateData.userId = userId;
      if (name) updateData.name = name;
      if (color) updateData.color = color;
      if (photo) updateData.photo = photo;
      if (indications) updateData.indications = indications;
      if (markerMap) updateData.markerMap = markerMap;
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
      // Validar el ID proporcionado
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("ID no válido:", id);
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }
  
      // Eliminar los horarios asociados al Tianguis
      const deletedSchedules = await ScheduleTianguis.deleteMany({ tianguisId: id });
  
      // Eliminar el Tianguis
      const deletedTianguis = await Tianguis.findByIdAndDelete(id);
      if (!deletedTianguis) {
        res.status(404).json(ApiResponse.errorResponse("Tianguis no encontrado", 404));
        return;
      }
  
      res.status(200).json(ApiResponse.successResponse("Tianguis y horarios asociados eliminados con éxito", {
        tianguis: deletedTianguis,
        deletedSchedules: deletedSchedules.deletedCount, // Cantidad de horarios eliminados
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      console.error("Error al eliminar el Tianguis:", errorMessage);
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
  
}
