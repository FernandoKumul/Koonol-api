import { z } from 'zod';

export const tianguisSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido"),
  name: z.string().min(1, "El nombre es requerido"),
  color: z.string().min(1, "El color es requerido"),
  photo: z.string().url("Debe ser una URL válida").optional(),
  indications: z.string().min(1, "Las indicaciones son requeridas"),
  
  // `markerMap` es un objeto que representa un punto geoespacial
  markerMap: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([
      z.number().min(-180).max(180), // Longitud
      z.number().min(-90).max(90),  // Latitud
    ]),
  }),
  
  locality: z.string().min(1, "La localidad es requerida"),
  active: z.boolean(),
});
