import { z } from "zod";

export const scheduleTianguisUpdateSchema = z.object({
    tianguisId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    dayWeek: z.string().min(1, "El día de la semana es requerido").optional(),
    indications: z.string().min(1, "Las indicaciones son requeridas").optional(),
    startTime: z.string().min(1, "La hora de inicio es requerida").optional(),
    endTime: z.string().min(1, "La hora de finalización es requerida").optional(),
  });