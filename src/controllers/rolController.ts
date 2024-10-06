import { Request, Response } from "express";
import Rol from "../models/rolModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class RolController {
  static getRoles = async (req: Request, res: Response) => {
    try {
      const roles = await Rol.find();
      res.status(200).json(ApiResponse.successResponse("Roles encontrados", roles));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

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
}
