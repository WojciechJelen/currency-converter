import { useId, type ComponentPropsWithRef } from "react";
import { Label } from "@/ui/inputs/label";

type NumberInputProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
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
      {label && <Label labelText={label} htmlFor={inputId} />}
      <input
        inputMode="decimal"
        step="any"
        {...props}
        type="number"
        id={inputId}
        aria-invalid={error ? true : props["aria-invalid"]}
        aria-describedby={
          [describedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
          undefined
        }
        className={`min-h-14 w-full min-w-0 rounded-lg border border-zinc-300 bg-background px-4 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-600 dark:border-zinc-700 dark:aria-invalid:border-red-400 ${className}`}
      />
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
