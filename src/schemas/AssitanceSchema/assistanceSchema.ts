import { z } from "zod";

export const assistanceSchema = z.object({
  locationSalesStallsId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  status: z.boolean(),
  tariff: z.number().positive("La tarifa debe ser un número positivo")
});
