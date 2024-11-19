import { z } from "zod";

export const requestSchema = z.object({
  method: z.string().min(1, "El método es requerido"),
  endpoint: z.string().min(1, "El endpoint es requerido"),
  body: z.record(z.any()).optional(),
});

export const errorMessageSchema = z.object({
  message: z.string().min(1, "El mensaje de error es requerido"),
});

export const responseSchema = z.object({
  success: z.boolean(),
  statusCode: z.number().int().min(100).max(599, "Código de estado inválido"),
  message: z.string().min(1, "El mensaje es requerido"),
  data: z.any().optional(),
  errors: z.array(errorMessageSchema).optional(),
});

export const logSchema = z.object({
  timestamp: z.date().or(z.string().datetime({ offset: true })),
  userId: z.string().optional(),
  ipAddress: z.string().min(7, "Dirección IP inválida"),
  request: requestSchema,
  response: responseSchema,
});
