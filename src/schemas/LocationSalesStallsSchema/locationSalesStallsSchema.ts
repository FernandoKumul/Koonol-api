import { z } from "zod";

export const locationSalesStallsSchema = z.object({
    salesStallsId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
    tianguisId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
    markerMap: z.object({
        type: z.literal("Point"),
        coordinates: z.tuple([z.number(), z.number()])
    })
});
