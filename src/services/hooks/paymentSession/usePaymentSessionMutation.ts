import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { paymentSessionsApiService } from "../../paymentSessionsApiService";
import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";

type paramsType = PartialPaymentSessionInt;

type updateSaleParamsType = {
  id: string;
  bulk: PartialPaymentSessionInt;
};

type deleteSaleParamsType = {
  id: string;
};

export const useCreatePaymentSessionMutation = (
  params?: paramsType,
  options?: UseMutationOptions<
    PartialPaymentSessionInt,
    Error,
    paramsType,
    unknown
  >
) => {
  return useMutation({
    mutationFn: (params: paramsType) => {
      return paymentSessionsApiService.createPaymentSession(params);
    },

    ...options,
  });
};

export const useUpdatePaymentSessionMutation = (
  params?: updateSaleParamsType,
  options?: UseMutationOptions<unknown, Error, updateSaleParamsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: updateSaleParamsType) => {
      return paymentSessionsApiService.updatePaymentSession(
        params.id,
        params.bulk
      );
    },

    ...options,
  });
};

export const useDeletePaymentMutation = (
  params?: deleteSaleParamsType,
  options?: UseMutationOptions<unknown, Error, deleteSaleParamsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: deleteSaleParamsType) => {
      return paymentSessionsApiService.deletePaymentSession(params.id);
    },

    ...options,
  });
};
