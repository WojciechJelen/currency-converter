export function formatAmount(value: number | undefined): number | "" {
  return value !== undefined && Number.isFinite(value) ? value : "";
}
