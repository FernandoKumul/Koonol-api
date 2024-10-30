import { Request, Response } from "express";
import Rol from "../models/rolModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

export default class RolController {

  // Obtener todos los roles
  static getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await Rol.find();
      res.status(200).json(ApiResponse.successResponse("Roles encontrados", roles));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo rol
  static createRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;  
      const newRol = new Rol({ name });  
      const savedRol = await newRol.save();
      res.status(201).json(ApiResponse.successResponse("Rol creado con éxito", savedRol));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un rol por su ID
  static getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const role = await Rol.findById(id);
      if (!role) {
        res.status(404).json(ApiResponse.errorResponse("Rol no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Rol encontrado", role));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un rol
  static updateRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (name) updateData.name = name;

      const updatedRole = await Rol.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedRole) {
        res.status(404).json(ApiResponse.errorResponse("Rol no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Rol actualizado con éxito", updatedRole));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un rol
  static deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedRole = await Rol.findByIdAndDelete(id);
      if (!deletedRole) {
        res.status(404).json(ApiResponse.errorResponse("Rol no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Rol eliminado con éxito", deletedRole));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
