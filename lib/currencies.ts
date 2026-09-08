import { z } from "zod";

export const currencySchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
});

export type Currency = z.infer<typeof currencySchema>;
