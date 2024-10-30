import { z } from "zod";

export const onlyPasswordSchema = z.object({
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres").nullable(),
})