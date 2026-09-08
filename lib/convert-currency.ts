import "server-only";

import { env } from "@/env";
import {
  CURRENCYBEACON_BASE_URL,
  CURRENCYBEACON_TIMEOUT_MS,
} from "@/lib/currencybeacon/constants";
import { conversionResponseSchema } from "@/lib/currencybeacon/schemas";
import type { CurrencyConverterValues } from "@/lib/utils/schema";

export async function convertCurrency({
  amount,
  from,
  to,
}: CurrencyConverterValues) {
  const url = new URL(`${CURRENCYBEACON_BASE_URL}/convert`);
  url.search = new URLSearchParams({ amount: String(amount), from, to }).toString();

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${env.CURRENCYBEACON_API_KEY}` },
    cache: "no-store",
    signal: AbortSignal.timeout(CURRENCYBEACON_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error("CurrencyBeacon conversion failed.");
  }

  const payload: unknown = await response.json();
  return conversionResponseSchema.parse(payload).response;
}
