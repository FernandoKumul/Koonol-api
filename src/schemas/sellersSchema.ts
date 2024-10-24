import { z } from "zod";

export const sellerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").trim(),
  lastName: z.string().min(1, "El apellido es requerido").trim(),
  email: z.string().email("Debe ser un correo válido").trim().nullable().optional(),
  photo: z.string().url().nullable().optional(), 
  birthday: z.string({required_error: "La fecha de cumpleaños es requerida"}),
  gender: z.enum(["male", "female", "other"], {required_error: "El género es requerido"}),
  phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido (10 dígitos)").optional(),
});
