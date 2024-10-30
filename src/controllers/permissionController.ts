import { Request, Response } from "express";
import Permission from "../models/permissionModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

export default class PermissionController {
  
  // Obtener todos los permisos
  static getPermissions = async (req: Request, res: Response) => {
    try {
      const permissions = await Permission.find()
        .populate("rolId", "name") 
        .populate("menuId", "name")  
        .populate("actionId", "name"); 
      res.status(200).json(ApiResponse.successResponse("Permisos encontrados", permissions));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo permiso
  static createPermission = async (req: Request, res: Response) => {
    try {
      const { rolId, menuId, actionId } = req.body;
      const newPermission = new Permission({ rolId, menuId, actionId });
      const savedPermission = await newPermission.save();
      res.status(201).json(ApiResponse.successResponse("Permiso creado con éxito", savedPermission));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un permiso por su ID
  static getPermissionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const permission = await Permission.findById(id)
        .populate("rolId", "name") 
        .populate("menuId", "name")  
        .populate("actionId", "name"); 

      if (!permission) {
        res.status(404).json(ApiResponse.errorResponse("Permiso no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Permiso encontrado", permission));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un permiso
  static updatePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rolId, menuId, actionId } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (rolId) updateData.rolId = rolId;
      if (menuId) updateData.menuId = menuId;
      if (actionId) updateData.actionId = actionId;

      const updatedPermission = await Permission.findByIdAndUpdate(id, updateData, { new: true })
        .populate("rolId", "name")
        .populate("menuId", "name")
        .populate("actionId", "name");

      if (!updatedPermission) {
        res.status(404).json(ApiResponse.errorResponse("Permiso no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Permiso actualizado con éxito", updatedPermission));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un permiso
  static deletePermission = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedPermission = await Permission.findByIdAndDelete(id);

      if (!deletedPermission) {
        res.status(404).json(ApiResponse.errorResponse("Permiso no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Permiso eliminado con éxito", deletedPermission));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
