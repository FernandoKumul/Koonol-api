import { z } from "zod";

export const locationSalesStallsUpdateSchema = z.object({
    salesStallsId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    tianguisId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    markerMap: z.object({
      type: z.literal("Point").optional(),
      coordinates: z.tuple([z.number(), z.number()]).optional(),
    }).optional(),
  });