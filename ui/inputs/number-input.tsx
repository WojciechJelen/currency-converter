import { useId, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberInputProps = Omit<ComponentProps<typeof Input>, "type"> & {
  label?: string;
  error?: string;
};

export function NumberInput({
  label,
  error,
  id,
  className = "",
  "aria-describedby": describedBy,
  ...props
}: NumberInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      {label && (
        <Label
          htmlFor={inputId}
          className="font-normal leading-5 text-muted-foreground"
        >
          {label}
        </Label>
      )}
      <Input
        inputMode="decimal"
        step="any"
        {...props}
        type="number"
        id={inputId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={
          [describedBy, error ? errorId : undefined]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={cn("h-14 px-4 py-3 md:text-base", className)}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
