"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { fetchConversion } from "@/lib/fetch-conversion";
import { formatAmount } from "@/lib/formatters";
import type { CurrencyConverterValues } from "@/lib/utils/schema";

type CurrencyConversionParams = Omit<CurrencyConverterValues, "amount"> & {
  amount: number | undefined;
};

export function useCurrencyConversion({
  amount,
  from,
  to,
}: CurrencyConversionParams) {
  const [debouncedAmount] = useDebounceValue(amount, 300);
  const isDebouncing = amount !== debouncedAmount;
  const requestAmount = isDebouncing ? undefined : amount;

  const { data, error, isFetching, isLoading, isError } = useQuery({
    queryKey: ["conversion", requestAmount, from, to],
    queryFn:
      requestAmount === undefined
        ? skipToken
        : ({ signal }) =>
            fetchConversion({ amount: requestAmount, from, to, signal }),
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const convertedAmount =
    requestAmount !== undefined && !isFetching ? formatAmount(data?.value) : "";

  return { convertedAmount, error, isDebouncing, isFetching, isLoading, isError };
}
