import { z } from "zod";

export const scheduleTianguisSchema = z.object({
    tianguisId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
    dayWeek: z.string().min(1, "El día de la semana es requerido"),
    indications: z.string().min(1, "Las indicaciones son requeridas"),
    startTime: z.string().min(1, "La hora de inicio es requerida"),
    endTime: z.string().min(1, "La hora de finalización es requerida")
});
