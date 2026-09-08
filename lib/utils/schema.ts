import { z } from "zod";

export const amountSchema = z
  .number({ error: "Enter a valid amount." })
  .nonnegative("Amount cannot be negative.");

export const currencyConverterSchema = z.object({
  amount: amountSchema,
  from: z.string().regex(/^[A-Z]{3}$/, "Select a valid source currency."),
  to: z.string().regex(/^[A-Z]{3}$/, "Select a valid target currency."),
});

export const currencyConversionQuerySchema = currencyConverterSchema.extend({
  amount: z
    .string()
    .trim()
    .min(1, "Enter a valid amount.")
    .transform(Number)
    .pipe(amountSchema),
});

export type CurrencyConverterValues = z.infer<typeof currencyConverterSchema>;
