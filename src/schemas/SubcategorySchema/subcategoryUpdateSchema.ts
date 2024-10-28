import { z } from "zod";

export const subcategoryUpdateSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
});
