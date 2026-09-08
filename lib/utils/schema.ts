import { z } from "zod";

export const amountSchema = z
  .number({ error: "Enter a valid amount." })
  .nonnegative("Amount cannot be negative.");

export const currencyConverterSchema = z.object({
  amount: amountSchema,
  from: z.string().min(1, "Select a source currency."),
  to: z.string().min(1, "Select a target currency."),
});
