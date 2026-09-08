import { useId, type ComponentPropsWithRef } from "react";
import { Label } from "@/ui/inputs/label";

type SelectInputProps = ComponentPropsWithRef<"select"> & {
  label?: string;
};

export function SelectInput({
  label,
  id,
  children,
  className = "",
  ...props
}: SelectInputProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-2">
      {label && <Label labelText={label} htmlFor={selectId} />}
      <select
        {...props}
        id={selectId}
        className={`min-h-14 w-full min-w-0 rounded-lg border border-zinc-300 bg-background px-4 py-3 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 ${className}`}
      >
        {children}
      </select>
    </div>
  );
}
