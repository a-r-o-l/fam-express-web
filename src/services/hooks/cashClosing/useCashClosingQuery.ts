import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {  PartialCashClosingIntWithPopulate } from "@/types/CashClosingTypes";
import { cashClosingApiService } from "@/services/cashClosingApiService";


export const useGetCashesClosingQuery = (
  params?: null,
  options?: UseQueryOptions<PartialCashClosingIntWithPopulate[], Error>
) => {
  return useQuery({
    queryKey: ["getCashesClosing"],
    queryFn: () => {
      return cashClosingApiService.getCashesClosing();
    },
    ...options,
  });
};
