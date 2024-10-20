import { z } from 'zod';

export const tianguisSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  name: z.string().min(1, "El nombre es requerido"),
  color: z.string().min(1, "El color es requerido"),
  dayWeek: z.string().min(1, "El día de la semana es requerido"),
  photo: z.string().url("Debe ser una URL válida").optional(),
  indications: z.string().min(1, "Las indicaciones son requeridas"),
  
  // `markerMap` es un objeto que representa un punto geoespacial
  markerMap: z.object({
    type: z.literal("Point"), // Solo permitimos el tipo "Point" para GeoJSON
    coordinates: z.tuple([z.number(), z.number()]) // Array de dos números [longitud, latitud]
  }),
  startTime: z.string().min(1, "La hora de inicio es requerida"),
  endTime: z.string().min(1, "La hora de finalización es requerida"),
  locality: z.string().min(1, "La localidad es requerida"),
  active: z.boolean(),
});
