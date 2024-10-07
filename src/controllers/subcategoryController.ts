import { Request, Response } from "express";
import Subcategory from "../models/subcategoryModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class SubCategoryController {

  // Obtener todas las subcategorías
  static getAllSubcategories = async (req: Request, res: Response) => {
    try {
      const subCategories = await Subcategory.find();
      res.status(200).json(ApiResponse.successResponse("Subcategorías encontradas", subCategories));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una nueva subcategoría
  static createSubcategory = async (req: Request, res: Response) => {
    try {
      const { name, categoryId } = req.body;

      // Crear una nueva subcategoría
      const newSubCategory = new Subcategory({
        name,
        categoryId
      });

      const savedSubCategory = await newSubCategory.save();
      res.status(201).json(ApiResponse.successResponse("Subcategoría creada con éxito", savedSubCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una subcategoría por su ID
  static getSubcategoryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Obtener el ID de los parámetros
      const subcategory = await Subcategory.findById(id);

      if (!subcategory) {
        return res.status(404).json(ApiResponse.errorResponse("Subcategoría no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Subcategoría encontrada", subcategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una subcategoría
  static updateSubcategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Obtener el ID de los parámetros
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedSubcategory) {
        return res.status(404).json(ApiResponse.errorResponse("Subcategoría no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Subcategoría actualizada con éxito", updatedSubcategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una subcategoría
  static deleteSubcategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;  // Obtener el ID de los parámetros
      const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

      if (!deletedSubcategory) {
        return res.status(404).json(ApiResponse.errorResponse("Subcategoría no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Subcategoría eliminada con éxito", deletedSubcategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
