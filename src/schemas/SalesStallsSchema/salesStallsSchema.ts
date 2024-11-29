import { z } from "zod";


export const salesStallsSchema = z.object({
  sellerId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  subCategoryId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  name: z.string().min(1, "El nombre es requerido"),
  photos: z.array(z.string().url({ message: "Las fotos deben ser URLs válidas" })),
  description: z.string().min(1, "La descripción es requerida"),
  type: z.boolean(),
  probation: z.boolean(),
  active: z.boolean(),
});
