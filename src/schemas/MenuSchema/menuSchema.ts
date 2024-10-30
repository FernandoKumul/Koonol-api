import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  ico: z.string().optional(),
});
