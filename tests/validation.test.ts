import { describe, expect, it } from "vitest";
import { currencyConversionQuerySchema } from "@/lib/utils/schema";

describe("conversion input", () => {
  it.each([
    { amount: "0", expected: 0 },
    { amount: "100", expected: 100 },
    { amount: " 12.50 ", expected: 12.5 },
  ])("accepts amount '$amount'", ({ amount, expected }) => {
    const input = currencyConversionQuerySchema.parse({
      amount,
      from: "USD",
      to: "EUR",
    });

    expect(input).toEqual({ amount: expected, from: "USD", to: "EUR" });
  });

  it.each(["", "   ", "-1", "abc", "Infinity"])(
    "rejects invalid amount %j",
    (amount) => {
      const result = currencyConversionQuerySchema.safeParse({
        amount,
        from: "USD",
        to: "EUR",
      });

      expect(result.success).toBe(false);
    },
  );

  it("rejects an invalid currency code", () => {
    const result = currencyConversionQuerySchema.safeParse({
      amount: "100",
      from: "US",
      to: "EUR",
    });

    expect(result.success).toBe(false);
  });
});
