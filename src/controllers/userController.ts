import { Request, Response } from "express";
import User from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class UserController {

  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json(ApiResponse.successResponse("Usuarios encontrados", users));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(ApiResponse.successResponse("Usuario creado con éxito", savedUser));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
