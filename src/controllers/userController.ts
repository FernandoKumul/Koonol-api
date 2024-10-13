import { Request, Response } from "express";
import User from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword } from "../utils/passwordCode";

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
      const {email} = req.body

      const repeatEmail = await User.findOne({email})
      if(repeatEmail){
        void res.status(403).json(ApiResponse.errorResponse('El correo electrónico proporcionado ya está en uso', 400));
        return;
      }

      const hashedPassword = await hashPassword(req.body.password);
      const newUser = new User({
        ...req.body,
        password: hashedPassword
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(ApiResponse.successResponse("Usuario creado con éxito", savedUser));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
  }