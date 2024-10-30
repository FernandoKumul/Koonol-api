import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"), 
  recommendedRate: z.number().positive("La tarifa recomendada debe ser un número positivo"),
  subcategories: z.array(z.object({
    name: z.string().min(1, "El nombre es requerido")
  })).optional()
});
