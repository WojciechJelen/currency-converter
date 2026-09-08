import { conversionResponseSchema } from "@/lib/currencybeacon/schemas";
import type { CurrencyConverterValues } from "@/lib/utils/schema";

export async function fetchConversion({
  amount,
  from,
  to,
  signal,
}: CurrencyConverterValues & { signal: AbortSignal }) {
  const params = new URLSearchParams({ amount: String(amount), from, to });
  const response = await fetch(`/api/convert?${params}`, {
    signal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to convert currencies. Please try again later.");
  }

  const payload: unknown = await response.json();
  return conversionResponseSchema.shape.response.parse(payload);
}
