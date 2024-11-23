import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"), 
  recommendedRate: z.number().min(0, "La tarifa recomendada debe ser un número positivo"),
  subcategories: z.array(z.object({
    name: z.string().min(1, "El nombre es requerido")
  })).optional()
});
