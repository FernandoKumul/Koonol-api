import { z } from "zod";

export const promotionUpdateSchema = z.object({
    salesStallId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    startDate: z.string().transform((str) => new Date(str)).optional(),
    endDate: z.string().transform((str) => new Date(str)).optional(),
    pay: z.number().positive("El pago debe ser un valor positivo").optional(),
  });