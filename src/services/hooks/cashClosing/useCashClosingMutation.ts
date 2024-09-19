import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { PartialCashClosingInt } from "@/types/CashClosingTypes";
import { cashClosingApiService } from "@/services/cashClosingApiService";


type CashClosingParamsMutation = {
  id:string
}


export const useCreateClashClosingMutation = (params?:null, options?:UseMutationOptions<unknown, Error, PartialCashClosingInt, unknown>) => {
  return useMutation({
    mutationFn: (params:PartialCashClosingInt) => {
      return cashClosingApiService.createCashClosing(params);
    },

    ...options,
  });
};


export const useDeleteClashClosingMutation = (params?:null, options?:UseMutationOptions<unknown, Error, CashClosingParamsMutation, unknown>) => {
  return useMutation({
    mutationFn: (params:CashClosingParamsMutation) => {
      return cashClosingApiService.deleteCashClosing(params.id);
    },

    ...options,
  });
};


