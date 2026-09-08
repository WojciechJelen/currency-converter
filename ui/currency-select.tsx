import { useId, type ComponentProps } from "react";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { Currency } from "@/lib/currencies";
import { cn } from "@/lib/utils";

type CurrencySelectProps = Omit<
  ComponentProps<typeof NativeSelect>,
  "children"
> & {
  currencies: readonly Currency[];
  label?: string;
};

export function CurrencySelect({
  currencies,
  label,
  id,
  className,
  ...props
}: CurrencySelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {label && (
        <Label
          htmlFor={selectId}
          className="font-normal leading-5 text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <NativeSelect
        {...props}
        id={selectId}
        className={cn(
          "w-full [&_select]:h-14 [&_select]:pl-4 [&_select]:text-base",
          className,
        )}
      >
        <NativeSelectOption value="" disabled>
          Select a currency
        </NativeSelectOption>
        {currencies.map(({ code, name }) => (
          <NativeSelectOption key={code} value={code}>
            {name} ({code})
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}
