import { z } from "zod";

export const conversionResponseSchema = z.object({
  response: z.object({
    value: z.number().nonnegative(),
  }),
});

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
