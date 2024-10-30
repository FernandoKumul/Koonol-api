import { Request, Response } from "express";
import Action from "../models/actionModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

export default class ActionController {
  
  static getActions = async (req: Request, res: Response) => {
    try {
      const actions = await Action.find();
      res.status(200).json(ApiResponse.successResponse("Acciones encontradas", actions));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static createAction = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newAction = new Action({ name });
      const savedAction = await newAction.save();
      res.status(201).json(ApiResponse.successResponse("Acción creada con éxito", savedAction));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una acción por su ID
  static getActionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const action = await Action.findById(id);
      if (!action) {
        res.status(404).json(ApiResponse.errorResponse("Acción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Acción encontrada", action));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una acción
  static updateAction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (name) updateData.name = name;

      const updatedAction = await Action.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedAction) {
        res.status(404).json(ApiResponse.errorResponse("Acción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Acción actualizada con éxito", updatedAction));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una acción
  static deleteAction = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedAction = await Action.findByIdAndDelete(id);
      if (!deletedAction) {
        res.status(404).json(ApiResponse.errorResponse("Acción no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Acción eliminada con éxito", deletedAction));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
