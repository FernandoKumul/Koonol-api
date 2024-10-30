import { Request, Response } from "express";
import Category from "../models/categoryModel";
import { ApiResponse } from "../utils/ApiResponse";
import ParseQueryToNumber from "../utils/ParseQueryToNumber";
import mongoose from "mongoose";
import Subcategory from "../models/subcategoryModel";

export default class CategoryController {

  // Obtener todas las categorías
  static getAllCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.status(200).json(ApiResponse.successResponse("Categorías encontradas", categories));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Buscar categorías con paginación, filtros y ordenamiento
  static searchCategories = async (req: Request, res: Response) => {
    try {
      const page = ParseQueryToNumber(req.query.page as string, 1);
      const limit = ParseQueryToNumber(req.query.limit as string, 10);
      const search = (req.query.search as string) || "";
      const sort = (req.query.sort as string) || "newest";

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
        name: { $regex: search, $options: "i" },
      };

      const categoriesList = await Category.find(searchFilters)
        .skip(offset)
        .limit(limit)
        .sort(sortQuery);

      const totalCategories = await Category.countDocuments(searchFilters);

      res.status(200).json(
        ApiResponse.successResponse("Categorías encontradas", {
          count: totalCategories,
          results: categoriesList,
        })
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Crear una nueva categoría
  static createCategory = async (req: Request, res: Response) => {
    try {
      const { name, recommendedRate, subcategories } = req.body;

      const newCategory = new Category({
        name,
        recommendedRate,
      });

      const savedCategory = await newCategory.save();

      if (subcategories && subcategories.length > 0) {
        const subcategoriesList = subcategories.map((subcategory: any) => ({
          name: subcategory.name,
          categoryId: savedCategory._id,
        }));

        await Subcategory.insertMany(subcategoriesList);
      }

      res.status(201).json(ApiResponse.successResponse("Categoría creada con éxito", savedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(400).json(ApiResponse.errorResponse(errorMessage));
    }
  };

  // Obtener una categoría por su ID
  static getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const category = await Category.findById(id);
      if (!category) {
        res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Categoría encontrada", category));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Actualizar una categoría
  static updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, recommendedRate } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      const updateData: any = {};
      if (name) updateData.name = name;
      if (recommendedRate !== undefined) updateData.recommendedRate = recommendedRate;

      const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedCategory) {
        res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Categoría actualizada con éxito", updatedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };

  // Eliminar una categoría
  static deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(ApiResponse.errorResponse("El ID proporcionado no es válido", 400));
        return;
      }

      await Subcategory.deleteMany({ categoryId: id });

      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        res.status(404).json(ApiResponse.errorResponse("Categoría no encontrada", 404));
        return;
      }

      res.status(200).json(ApiResponse.successResponse("Categoría eliminada con éxito", deletedCategory));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      res.status(500).json(ApiResponse.errorResponse(errorMessage, 500));
    }
  };
}
