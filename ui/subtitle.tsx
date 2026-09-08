import type { ComponentPropsWithoutRef } from "react";

export function Subtitle({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...props}
      className={`text-sm text-zinc-600 dark:text-zinc-400 ${className}`}
    >
      {children}
    </p>
  );
}
