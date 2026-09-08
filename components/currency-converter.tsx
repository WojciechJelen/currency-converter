"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type { Currency } from "@/lib/currencies";
import { currencyConverterSchema } from "@/lib/utils/schema";
import { CurrencySelect } from "@/ui/currency-select";
import { NumberInput } from "@/ui/inputs/number-input";
import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

type CurrencyConverterProps = {
  currencies: readonly Currency[];
};

export function CurrencyConverter({ currencies }: CurrencyConverterProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currencyConverterSchema),
    defaultValues: { amount: 1, from: "USD", to: "EUR" },
    mode: "onChange",
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
            {...register("amount", { valueAsNumber: true })}
            label="Amount"
            min={0}
            required
            error={errors.amount?.message}
          />
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
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3">
          <NumberInput
            label="Converted amount"
            value=""
            placeholder="0.00"
            readOnly
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
      </div>
    </section>
  );
}
