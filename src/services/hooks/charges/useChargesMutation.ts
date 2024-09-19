import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { chargesApiService } from "../../chargesApiService";
import { PartialChargeInt } from "@/types/ChargeTypes";

type paramsType = PartialChargeInt

export const useCreateChargeMutation = (params?:paramsType, options?:UseMutationOptions<unknown, Error, paramsType, unknown>) => {
  return useMutation({
    mutationFn: (params:paramsType) => {
      return chargesApiService.createCharge(params);
    },

    ...options,
  });
};

