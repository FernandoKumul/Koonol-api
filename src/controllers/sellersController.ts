import { Request, Response } from "express";
import Seller from "../models/sellersModel";
import { ApiResponse } from "../utils/ApiResponse";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import mongoose from "mongoose";

export default class SellersController {

  // Obtener todos los vendedores
  static getAllSellers = async (req: Request, res: Response) => {
    try {
      const sellers = await Seller.find();
      res.status(200).json(ApiResponse.successResponse("Vendedores encontrados", sellers));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Buscar vendedores con filtros y ordenamiento
  static searchSellers = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";
      const gender = req.query.gender as string; 

      let sortQuery = {};
      switch (sort) {
        case "newest":
          sortQuery = { creationDate: "desc" };
          break;
        case "oldest":
          sortQuery = { creationDate: "asc" };
          break;
        case "a-z":
          sortQuery = { name: "asc" };
          break;
        case "z-a":
          sortQuery = { name: "desc" };
          break;
        default:
          sortQuery = { creationDate: "desc" };
      }

      const offset = (page - 1) * limit;
      const searchFilters: any = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search, $options: "i" } },
        ],
      };

      if (gender) {
        searchFilters.gender = gender;
      }

      const sellersList = await Seller.find(searchFilters)
        .skip(offset)
        .limit(limit)
        .sort(sortQuery);

      const totalSellers = await Seller.countDocuments(searchFilters);

      res.status(200).json(
        ApiResponse.successResponse("Vendedores encontrados", {
          count: totalSellers,
          results: sellersList,
        })
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear un nuevo vendedor
  static createSeller = async (req: Request, res: Response) => {
    try {
      const { name, lastName, email, photo, birthday, gender, phoneNumber } = req.body;

      const newSeller = new Seller({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email ? email.trim() : null,
        photo,
        birthday,
        gender,
        phoneNumber: phoneNumber ?? null,
        updateDate: Date.now(),
      });

      const savedSeller = await newSeller.save();
      res.status(201).json(ApiResponse.successResponse("Vendedor creado con éxito", savedSeller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener un vendedor por su ID
  static getSellerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const seller = await Seller.findById(id);
      if (!seller) {
        res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor encontrado", seller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un vendedor
  static updateSeller = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, lastName, email, photo, birthday, gender, phoneNumber } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (name) updateData.name = name.trim();
      if (lastName) updateData.lastName = lastName.trim();
      if (email !== undefined) updateData.email = email ? email.trim() : null;
      if (photo !== undefined) updateData.photo = photo ? photo : null;
      if (birthday) updateData.birthday = birthday;
      if (gender) updateData.gender = gender;
      if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

      const updatedSeller = await Seller.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedSeller) {
        res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor actualizado con éxito", updatedSeller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un vendedor
  static deleteSeller = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const deletedSeller = await Seller.findByIdAndDelete(id);
      if (!deletedSeller) {
        res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor eliminado con éxito", deletedSeller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
