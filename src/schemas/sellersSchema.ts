import { z } from "zod";

export const sellerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email().optional(),
  photo: z.string().url().optional(), 
  birthday: z.string({required_error: "La fecha de cumpleaños es requerida"}).transform((str) => new Date(str)),
  gender: z.string().min(1, "El género es requerido"),
  phoneNumber: z.string().optional(),
});
