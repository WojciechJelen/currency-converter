"use client";

import { Controller, useForm } from "react-hook-form";
import type { Currency } from "@/lib/currencies";
import { CurrencySelect } from "@/ui/currency-select";
import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

type CurrencyConverterValues = {
  from: string;
  to: string;
};

type CurrencyConverterProps = {
  currencies: readonly Currency[];
};

export function CurrencyConverter({ currencies }: CurrencyConverterProps) {
  const { control } = useForm<CurrencyConverterValues>({
    defaultValues: { from: "USD", to: "EUR" },
  });

  return (
    <section
      aria-labelledby="converter-title"
      className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-background p-6 sm:p-8 dark:border-zinc-800"
    >
      <Title id="converter-title">Currency converter</Title>
      <Subtitle className="mt-2">Choose your currencies</Subtitle>

      <div className="mt-8 grid gap-5">
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <CurrencySelect
              {...field}
              label="From"
              currencies={currencies}
            />
          )}
        />
        <Controller
          name="to"
          control={control}
          render={({ field }) => (
            <CurrencySelect
              {...field}
              label="To"
              currencies={currencies}
            />
          )}
        />
      </div>
    </section>
  );
}
