import { Request, Response } from "express";
import Seller from "../models/sellersModel";
import { ApiResponse } from "../utils/ApiResponse";

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

  // Crear un nuevo vendedor
  static createSeller = async (req: Request, res: Response) => {
    try {
      const { name, lastName, email, photo, birthday, gender, phoneNumber } = req.body;

      const newSeller = new Seller({
        name,
        lastName,
        email,
        photo,
        birthday,
        gender,
        phoneNumber
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
    try {
      const { id } = req.params; 
      const seller = await Seller.findById(id);

      if (!seller) {
        return res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor encontrado", seller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar un vendedor
  static updateSeller = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const updatedSeller = await Seller.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedSeller) {
        return res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor actualizado con éxito", updatedSeller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar un vendedor
  static deleteSeller = async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const deletedSeller = await Seller.findByIdAndDelete(id);

      if (!deletedSeller) {
        return res.status(404).json(ApiResponse.errorResponse("Vendedor no encontrado", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Vendedor eliminado con éxito", deletedSeller));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
