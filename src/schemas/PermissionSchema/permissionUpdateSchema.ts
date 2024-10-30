import { z } from "zod";

export const permissionUpdateSchema = z.object({
    rolId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    menuId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
    actionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Debe ser un ObjectId válido").optional(),
  });