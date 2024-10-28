import { z } from "zod";

export const rolSchema = z.object({
  name: z.string(),
});
