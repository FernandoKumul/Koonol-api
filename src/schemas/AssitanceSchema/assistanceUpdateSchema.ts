import { z } from "zod";

export const assistanceUpdateSchema = z.object({
  locationSalesStallsId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido")
    .optional(),
  status: z.boolean().optional(),
  tariff: z.number().positive("La tarifa debe ser un número positivo").optional(),
});
