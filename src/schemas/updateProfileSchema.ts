import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "El nombre debe de tener al menos 1 carácter").trim(),
  lastName: z.string().min(1, "El apellido es requerido").trim(),
  photo: z.string().url("Debe ser una URL válida").nullable(),
  birthday: z.string().date("Debe ser una fecha válida"),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido (10 dígitos)"),
});