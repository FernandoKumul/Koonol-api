import { Request, Response } from "express";
import Category from "../models/categoryModel";
import Subcategory from "../models/subcategoryModel";
import { ApiResponse } from "../utils/ApiResponse";

export default class CategoryController {

  // Obtener todas las categorías con sus subcategorías
  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find().populate('subcategories'); // Poblamos las subcategorías
      res.status(200).json(ApiResponse.successResponse("Categorías encontradas", categories));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una nueva categoría
  static createCategory = async (req: Request, res: Response) => {
    try {
      const { name, recommendedRate } = req.body;

      // Crear una nueva categoría
      const newCategory = new Category({
        name,
        recommendedRate
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(ApiResponse.successResponse("Categoría creada con éxito", savedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una categoría por su ID con sus subcategorías
  static getCategoryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id).populate('subcategories'); // Poblamos las subcategorías

      if (!category) {
        return res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Categoría encontrada", category));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una categoría
  static updateCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedCategory) {
        return res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
      }

      res.status(200).json(ApiResponse.successResponse("Categoría actualizada con éxito", updatedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una categoría y sus subcategorías
  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
      }

      // Eliminar las subcategorías asociadas
      await Subcategory.deleteMany({ categoryId: deletedCategory._id });

      res.status(200).json(ApiResponse.successResponse("Categoría y subcategorías eliminadas con éxito", deletedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una subcategoría
  static createSubcategory = async (req: Request, res: Response) => {
    try {
      const { name, categoryId } = req.body;

      // Verificar si la categoría existe
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
      }

      // Crear la nueva subcategoría
      const newSubcategory = new Subcategory({
        name,
        categoryId
      });

      const savedSubcategory = await newSubcategory.save();

      // Añadir la subcategoría a la categoría
      category.subcategories.push(savedSubcategory._id);
      await category.save();

      res.status(201).json(ApiResponse.successResponse("Subcategoría creada con éxito", savedSubcategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Actualizar una subcategoría
  static updateSubcategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
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
      const { id } = req.params;
      const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

      if (!deletedSubcategory) {
        return res.status(404).json(ApiResponse.errorResponse("Subcategoría no encontrada", 404));
      }

      // Eliminar la referencia en la categoría
      await Category.findByIdAndUpdate(deletedSubcategory.categoryId, {
        $pull: { subcategories: deletedSubcategory._id }
      });

      res.status(200).json(ApiResponse.successResponse("Subcategoría eliminada con éxito", deletedSubcategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
