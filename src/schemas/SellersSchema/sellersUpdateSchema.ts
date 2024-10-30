import { z } from "zod";

export const sellerUpdateSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").trim().optional(),
    lastName: z.string().min(1, "El apellido es requerido").trim().optional(),
    email: z.string().email("Debe ser un correo válido").trim().nullable().optional(),
    photo: z.string().url().nullable().optional(),
    birthday: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido (10 dígitos)").nullable().optional(),
  });