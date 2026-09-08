"use client";

import { skipToken, useQuery } from "@tanstack/react-query";
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
  const { data, error, isFetching, isLoading, isError } = useQuery({
    queryKey: ["conversion", amount, from, to],
    queryFn:
      amount === undefined
        ? skipToken
        : ({ signal }) => fetchConversion({ amount, from, to, signal }),
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const convertedAmount =
    amount !== undefined && !isFetching ? formatAmount(data?.value) : "";

  return { convertedAmount, error, isFetching, isLoading, isError };
}
