import { z } from "zod";

export const salesStallsUpdateSchema = z.object({
    sellerId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    subCategoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    name: z.string().min(1, "El nombre es requerido").optional(),
    photos: z.array(z.string().url({ message: "Las fotos deben ser URLs válidas" })).optional(),
    description: z.string().min(1, "La descripción es requerida").optional(),
    type: z.string().min(1, "El tipo es requerido").optional(),
    probation: z.boolean().optional(),
    active: z.boolean().optional(),
  });