import { z } from "zod";

export const categoryUpdateSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").optional(),
  recommendedRate: z.number().min(0, "La tarifa recomendada debe ser un número positivo"),
  subcategories: z.array(z.object({
    _id: z.string({ message: "El id de la subcategoría es requerido" }),
    name: z.string().min(1, "El nombre es requerido")
  }))
});