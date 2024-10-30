import { z } from "zod";

export const promotionSchema = z.object({
  salesStallId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  startDate: z.string({ required_error: "La fecha de inicio es requerida"}).transform((str) => new Date(str)),
  endDate: z.string({ required_error: "La fecha de fin es requerida"}).transform((str) => new Date(str)),
  pay: z.number({ required_error: "El pago es requerido"}).positive("El pago debe ser un valor positivo")
});
