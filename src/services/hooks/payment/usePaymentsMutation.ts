import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { paymentsApiService } from "../../paymentsApiService";
import { PartialPaymentInt } from "@/types/PaymentTypes";

type paramsType = PartialPaymentInt;

type updateSaleParamsType = {
  id: string;
  bulk: PartialPaymentInt;
};

type deleteSaleParamsType = {
  id: string;
};

export const useCreatePaymentMutation = (
  params?: paramsType,
  options?: UseMutationOptions<unknown, Error, paramsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: paramsType) => {
      return paymentsApiService.createPayment(params);
    },

    ...options,
  });
};

export const useUpodatePaymentMutation = (
  params?: updateSaleParamsType,
  options?: UseMutationOptions<unknown, Error, updateSaleParamsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: updateSaleParamsType) => {
      return paymentsApiService.updatePayment(params.id, params.bulk);
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
      return paymentsApiService.deletePayment(params.id);
    },

    ...options,
  });
};
