import { Request, Response } from "express";
import User from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword } from "../utils/passwordCode";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";

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

  static searchUsers = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1)
      const limit = ParseQueryToNumber(req.query.limit as string, 10)
      const search = req.query.search
      const rol = req.query.rol
      const sort = req.query.sort as string || 'newest'

      let sortQuery = {}

      switch (sort) {
        case 'newest':
          sortQuery = { creationDate: 'desc' }
          break
        case 'a-z':
          sortQuery = { name: 'asc' }
          break
        case 'z-a':
          sortQuery = { name: 'desc' }
          break
        case 'oldest':
          sortQuery = { creationDate: 'asc' }
          break
        default:
          sortQuery = { creationDate: 'desc' }
      }

      const idListRol: string[] = []

      switch (rol) {
        case 'admin':
          idListRol.push('670318104d9824b4da0d9a9b')
          break
        case 'gestor':
          idListRol.push('6704214d834d7e5203cc834d')
          break
        default:
          idListRol.push('670318104d9824b4da0d9a9b', '6704214d834d7e5203cc834d')
      }

      const offset = (page - 1) * limit
      console.log(offset)

      const users = await User.find({
        $or: [      
          {name: { $regex: search || '', $options: "i" }},
          {lastName: { $regex: search || '', $options: "i" }},
          {email: { $regex: search || '', $options: "i" }},
        ],
        rolId: { $in: idListRol }
      }).skip(offset).limit(limit).sort(sortQuery)

      const totalUsers = await User.countDocuments({
        $or: [      
          {name: { $regex: search || '', $options: "i" }},
          {lastName: { $regex: search || '', $options: "i" }},
          {email: { $regex: search || '', $options: "i" }},
        ],
        rolId: { $in: idListRol }
      })

      res.status(200).json(ApiResponse.successResponse("Usuarios encontrados", {
        count: totalUsers,
        results: users
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  }

  static createUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.body

      const repeatEmail = await User.findOne({ email })
      if (repeatEmail) {
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