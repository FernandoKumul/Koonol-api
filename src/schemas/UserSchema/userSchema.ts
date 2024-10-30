import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "El nombre debe de tener al menos 1 carácter").trim(),
  lastName: z.string().min(1, "El apellido es requerido").trim(),
  email: z.string().email("Debe ser un correo válido").trim(),
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres"),
  rolId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  photo: z.string().url("Debe ser una URL válida").nullable().optional(),
  birthday: z.string().date("Debe ser una fecha válida"),
  gender: z.enum(["male", "female", "other"]),
  phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido (10 dígitos)"),
});
