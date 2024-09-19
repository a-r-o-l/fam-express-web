import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { salesApiService } from "../../salesApiService";
import { PartialSaleInt } from "@/types/SaleTypes";

type paramsType = PartialSaleInt;

type updateSaleParamsType = {
  id: string;
  bulk: PartialSaleInt;
};

type deleteSaleParamsType = {
  id: string;
};

export const useCreateSaleMutation = (
  params?: paramsType,
  options?: UseMutationOptions<unknown, Error, paramsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: paramsType) => {
      return salesApiService.createSale(params);
    },

    ...options,
  });
};

export const useUpodateSaleMutation = (
  params?: updateSaleParamsType,
  options?: UseMutationOptions<unknown, Error, updateSaleParamsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: updateSaleParamsType) => {
      return salesApiService.updateSale(params.id, params.bulk);
    },

    ...options,
  });
};

export const useDeleteSaleMutation = (
  params?: deleteSaleParamsType,
  options?: UseMutationOptions<unknown, Error, deleteSaleParamsType, unknown>
) => {
  return useMutation({
    mutationFn: (params: deleteSaleParamsType) => {
      return salesApiService.deleteSale(params.id);
    },

    ...options,
  });
};
