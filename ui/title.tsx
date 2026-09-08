import type { ComponentPropsWithoutRef } from "react";

export function Title({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1 {...props} className={`text-2xl font-normal tracking-tight ${className}`}>
      {children}
    </h1>
  );
}
