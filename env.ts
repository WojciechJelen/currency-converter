import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CURRENCYBEACON_API_KEY: z.string().trim().min(1),
  },
  runtimeEnv: {
    CURRENCYBEACON_API_KEY: process.env.CURRENCYBEACON_API_KEY,
  },
  emptyStringAsUndefined: true,
});
