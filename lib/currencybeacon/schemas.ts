import { z } from "zod";

export const currenciesResponseSchema = z.object({
  response: z
    .array(
      z.object({
        short_code: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .min(1),
});
