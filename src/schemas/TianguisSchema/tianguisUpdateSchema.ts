import { z } from "zod";

export const tianguisUpdateSchema = z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    name: z.string().min(1, "El nombre es requerido").optional(),
    color: z.string().min(1, "El color es requerido").optional(),
    dayWeek: z.string().min(1, "El día de la semana es requerido").optional(),
    photo: z.string().url("Debe ser una URL válida").optional(),
    indications: z.string().min(1, "Las indicaciones son requeridas").optional(),
    markerMap: z.object({
      type: z.literal("Point").optional(),
      coordinates: z.tuple([z.number(), z.number()]).optional(),
    }).optional(),
    startTime: z.string().min(1, "La hora de inicio es requerida").optional(),
    endTime: z.string().min(1, "La hora de finalización es requerida").optional(),
    locality: z.string().min(1, "La localidad es requerida").optional(),
    active: z.boolean().optional(),
  });