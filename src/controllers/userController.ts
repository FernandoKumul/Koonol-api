import { Request, Response } from "express";
import User from "../models/userModel";
import { ApiResponse } from "../utils/ApiResponse";
import { hashPassword } from "../utils/passwordCode";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import Tianguis from "../models/tianguisModel";
import mongoose from "mongoose";

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

  static getUserById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400))
        return
      }

      const user = await User.findById(id).populate('rolId')

      if (!user) {
        res.status(404).json(ApiResponse.errorResponse("Usuario no encontrado", 404))
        return
      }

      res.status(200).json(ApiResponse.successResponse("Usuario encontrado", user))

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  }

  static searchUsers = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1)
      const limit = ParseQueryToNumber(req.query.limit as string, 10)
      const search = req.query.search || ''
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

      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
        rolId: { $in: idListRol }
      }).populate('rolId').skip(offset).limit(limit).sort(sortQuery)

      const totalUsers = await User.countDocuments({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
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
      const { email, lastName, name, password, rolId, photo, birthday, gender, phoneNumber } = req.body

      const repeatEmail = await User.findOne({ email: email.trim() })
      if (repeatEmail) {
        void res.status(403).json(ApiResponse.errorResponse('El correo electrónico proporcionado ya está en uso', 400));
        return;
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        email: email.trim(),
        lastName: lastName.trim(),
        name: name.trim(),
        password: hashedPassword,
        rolId,
        photo,
        birthday,
        gender,
        phoneNumber
      });

      const savedUser = await newUser.save();
      res.status(201).json(ApiResponse.successResponse("Usuario creado con éxito", savedUser));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400))
        return
      }

      const exists = await Tianguis.exists({ userId: id })

      if (exists) {
        res.status(403).json(ApiResponse.errorResponse("No se puede eliminar el usuario porque tiene tianguis asociados", 403));
        return
      }

      const user = await User.findByIdAndDelete(id)

      if (!user) {
        res.status(404).json(ApiResponse.errorResponse("Usuario no encontrado", 404))
        return
      }

      res.status(200).json(ApiResponse.successResponse("Usuario eliminado con éxito", user))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  }

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { email, lastName, name, password, rolId, photo, birthday, gender, phoneNumber } = req.body
      const id = req.params.id

      const repeatEmail = await User.findOne({ _id: { $ne: id }, email: email.trim() })
      if (repeatEmail) {
        res.status(403).json(ApiResponse.errorResponse('El correo electrónico proporcionado ya está en uso', 400));
        return;
      }

      const updateData: any = {
        email: email.trim(),
        lastName: lastName.trim(), 
        name: name.trim(), 
        rolId, 
        photo: photo ?? null, 
        birthday, 
        gender, 
        phoneNumber, 
        updateDate: Date.now()
      }

      if (password) {
        const hashedPassword = await hashPassword(password);
        updateData.password = hashedPassword
      }

      const updateUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!updateUser) {
        res.status(404).json(ApiResponse.errorResponse("Usuario no encontrado", 404));
        return
      }

      res.status(200).json(ApiResponse.successResponse("Usuario actualizado con éxito", updateUser));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  }
}