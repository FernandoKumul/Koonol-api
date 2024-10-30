import { z } from "zod";

export const categoryUpdateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").optional(), 
    recommendedRate: z.number().positive("La tarifa recomendada debe ser un número positivo").optional(),
  });