import { z } from "zod";

export const actionUpdateSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido')
})