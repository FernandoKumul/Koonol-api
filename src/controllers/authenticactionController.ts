import { Request, Response } from "express";
import User from "../models/userModel";
import Rol from "../models/rolModel";
import { comparePassword } from "../utils/passwordCode";
import { ApiResponse } from "../utils/ApiResponse";
import { ILogin } from "../interfaces/IAuthenticacion";
import { loginSchema } from "../schemas/AuthenticationSchema/authenticacionSchema";
import { generateToken } from "../utils/generateToken";

export default class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => { 
    try {
      loginSchema.parse(req.body);

      const { email, password }: ILogin = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        void res.status(401).json(ApiResponse.errorResponse('Credenciales no válidas', 401));
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        void res.status(401).json(ApiResponse.errorResponse('Credenciales no válidas', 401));
        return;
      }

      const rol = await Rol.findById(user.rolId)
      if(!rol){
        void res.status(500).json(ApiResponse.errorResponse('Rol no encontrado', 500));
        return;
      }

      const token = generateToken(user.id, user.name, user.rolId, rol.name);

      res.status(200).json(ApiResponse.successResponse('Bienvenido', { token }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
  static validateToken = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401).json(ApiResponse.errorResponse("Token autorizado", 401))
      return
    }

    const { userId } = req.user
    try {
      const user = await User.findById(userId).populate('rolId')
      if (!user) {
        res.status(404).json(ApiResponse.errorResponse("Usuario no encontrado", 404))
        return
      }

      res.status(200).json(ApiResponse.successResponse(`Autenticado, bienvenido: ${user.name}`))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  }
}
