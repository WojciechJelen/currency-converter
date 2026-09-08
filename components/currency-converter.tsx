"use client";

import { useState } from "react";
import type { Currency } from "@/lib/currencies";
import { useCurrencyConversion } from "@/lib/hooks/useCurrencyConversion";
import { currencyConversionQuerySchema } from "@/lib/utils/schema";
import { CurrencySelect } from "@/ui/currency-select";
import { NumberInput } from "@/ui/inputs/number-input";
import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

type CurrencyConverterProps = {
  currencies: readonly Currency[];
};

type AmountInput = {
  side: "from" | "to";
  text: string;
};

export function CurrencyConverter({ currencies }: CurrencyConverterProps) {
  const [input, setInput] = useState<AmountInput>({
    side: "from",
    text: "1",
  });
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const amountResult = currencyConversionQuerySchema.shape.amount.safeParse(
    input.text,
  );
  const amount = amountResult.data;
  const amountError = amountResult.error?.issues[0]?.message;
  const sourceCurrency = input.side === "from" ? from : to;
  const targetCurrency = input.side === "from" ? to : from;

  const { convertedAmount, error } = useCurrencyConversion({
    amount,
    from: sourceCurrency,
    to: targetCurrency,
  });

  return (
    <section
      aria-labelledby="converter-title"
      className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-background p-6 sm:p-8 dark:border-zinc-800"
    >
      <Title id="converter-title">Currency converter</Title>
      <Subtitle className="mt-2">Choose your currencies</Subtitle>

      <div className="mt-8 grid gap-5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
          <NumberInput
            label="Amount"
            value={input.side === "from" ? input.text : convertedAmount}
            onChange={(event) => {
              setInput({ side: "from", text: event.currentTarget.value });
            }}
            min={0}
            required
            error={input.side === "from" ? amountError : error?.message}
          />
          <CurrencySelect
            name="from"
            label="From"
            value={from}
            onChange={(event) => setFrom(event.currentTarget.value)}
            currencies={currencies}
          />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
          <NumberInput
            label="Converted amount"
            value={input.side === "to" ? input.text : convertedAmount}
            onChange={(event) => {
              setInput({ side: "to", text: event.currentTarget.value });
            }}
            placeholder="0.00"
            min={0}
            required
            error={input.side === "to" ? amountError : error?.message}
          />
          <CurrencySelect
            name="to"
            label="To"
            value={to}
            onChange={(event) => setTo(event.currentTarget.value)}
            currencies={currencies}
          />
        </div>
      </div>
    </section>
  );
}
