import type { ComponentProps } from "react";
import type { Currency } from "@/lib/currencies";
import { SelectInput } from "@/ui/inputs/select-input";

type CurrencySelectProps = Omit<ComponentProps<typeof SelectInput>, "children"> & {
  currencies: readonly Currency[];
};

export function CurrencySelect({
  currencies,
  ...props
}: CurrencySelectProps) {
  return (
    <SelectInput {...props}>
      <option value="" disabled>
        Select a currency
      </option>
      {currencies.map(({ code, name }) => (
        <option key={code} value={code}>
          {name} ({code})
        </option>
      ))}
    </SelectInput>
  );
}
