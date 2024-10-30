import { z } from "zod";

export const subcategorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"), 
  categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido")
});
