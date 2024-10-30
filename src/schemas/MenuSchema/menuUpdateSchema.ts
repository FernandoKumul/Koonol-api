import { z } from "zod";

export const menuUpdateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").optional(),
    ico: z.string().optional(),
  });
  