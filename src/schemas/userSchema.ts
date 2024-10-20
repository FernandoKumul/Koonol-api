import { z } from 'zod';

export const userRegistrationSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres"),
  rolId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  photo: z.string().url("Debe ser una URL válida").optional(),
  birthday: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  phoneNumber: z.string().min(10, "Debe ser un número de teléfono válido").optional(),
});
