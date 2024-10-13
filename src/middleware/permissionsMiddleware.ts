import Permission from "../models/permissionModel";
import { Response, NextFunction, Request } from 'express';
import { ApiResponse } from '../utils/ApiResponse';
import mongoose from 'mongoose';

export const permissionMiddleware = (menuId: string, actionId: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { rolId } = (req as any).user;

    try {
      const menuObjectId = new mongoose.Types.ObjectId(menuId);
      const actionObjectId = new mongoose.Types.ObjectId(actionId);

      const permission = await Permission.findOne({
        rolId: new mongoose.Types.ObjectId(rolId),
        menuId: menuObjectId,
        actionId: actionObjectId
      });

      if (!permission) {
        res.status(403).json(ApiResponse.errorResponse("Acceso denegado: no tienes permiso para realizar esta acción.", 403));
        return; 
      }
      next(); 
    } catch (error) {
      res.status(500).json(ApiResponse.errorResponse("Error en la verificación de permisos", 500));
    }
  };
};
