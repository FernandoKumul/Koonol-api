import { z } from "zod";

export const rolUpdateSchema = z.object({
    name: z.string().optional(),
  });