import "server-only";

import { env } from "@/env";
import {
  CURRENCYBEACON_BASE_URL,
  CURRENCYBEACON_TIMEOUT_MS,
  CURRENCIES_REVALIDATE_SECONDS,
} from "@/lib/currencybeacon/constants";
import { currenciesResponseSchema } from "@/lib/currencybeacon/schemas";

export async function loadCurrencies() {
  const response = await fetch(`${CURRENCYBEACON_BASE_URL}/currencies`, {
    headers: { Authorization: `Bearer ${env.CURRENCYBEACON_API_KEY}` },
    cache: "force-cache",
    next: { revalidate: CURRENCIES_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(CURRENCYBEACON_TIMEOUT_MS),
  });

  if (!response.ok) throw new Error("Unable to load currencies");

  const payload: unknown = await response.json();
  const data = currenciesResponseSchema.parse(payload);

  return data.response.map(({ short_code, name }) => ({
    code: short_code,
    name,
  }));
}
