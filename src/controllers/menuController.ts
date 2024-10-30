import { Request, Response } from "express";
import Menu from "../models/menuModel";
import { ApiResponse } from "../utils/ApiResponse";
import mongoose from "mongoose";

export default class MenuController {
  
  // Obtener todos los menús
  static getMenus = async (req: Request, res: Response) => {
    try {
      const menus = await Menu.find();
      res.status(200).json(ApiResponse.successResponse("Menús encontrados", menus));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo menú
  static createMenu = async (req: Request, res: Response) => {
    try {
      const { name, ico } = req.body;
      const newMenu = new Menu({ name, ico });
      const savedMenu = await newMenu.save();
      res.status(201).json(ApiResponse.successResponse("Menú creado con éxito", savedMenu));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un menú por su ID
  static getMenuById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const menu = await Menu.findById(id);
      if (!menu) {
        res.status(404).json(ApiResponse.errorResponse("Menú no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Menú encontrado", menu));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un menú
  static updateMenu = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, ico } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (ico) updateData.ico = ico;

      const updatedMenu = await Menu.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedMenu) {
        res.status(404).json(ApiResponse.errorResponse("Menú no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Menú actualizado con éxito", updatedMenu));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un menú
  static deleteMenu = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedMenu = await Menu.findByIdAndDelete(id);
      if (!deletedMenu) {
        res.status(404).json(ApiResponse.errorResponse("Menú no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Menú eliminado con éxito", deletedMenu));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
