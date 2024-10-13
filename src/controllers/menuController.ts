import { Request, Response } from "express";
import Menu from "../models/menuModel";
import { ApiResponse } from "../utils/ApiResponse";

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
  }