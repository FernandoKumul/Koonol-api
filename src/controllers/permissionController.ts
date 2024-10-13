import { Request, Response } from "express";
import Permission from "../models/permissionModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class PermissionController {
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
  }