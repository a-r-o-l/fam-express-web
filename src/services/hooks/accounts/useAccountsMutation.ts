import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { accountsApiService } from "../../accountsApiService";
import { PartialAccountInt } from "@/types/AccountTypes";

type CreateAccountParams = PartialAccountInt

type UpdateAccountParams = {id: string, bulk:PartialAccountInt}
type DeleteAccountParams = {id: string}

export const useCreateAccountMutation = (params?:CreateAccountParams, options?:UseMutationOptions<unknown, Error,CreateAccountParams, unknown >) => {
  return useMutation({
    mutationFn: (params: CreateAccountParams) => {
      return accountsApiService.createAccount(params);
    },

    ...options,
  });
};

export const useUpdateAccountMutation = (params?:null, options?:UseMutationOptions<unknown, Error,UpdateAccountParams, unknown >) => {
  return useMutation({
    mutationFn: (params: UpdateAccountParams) => {
      return accountsApiService.updateAccount(params.id, params.bulk);
    },

    ...options,
  });
};

export const useDeleteAccountMutation = (params?:null, options?:UseMutationOptions<unknown, Error,DeleteAccountParams, unknown >) => {
  return useMutation({
    mutationFn: (params: DeleteAccountParams) => {
      return accountsApiService.deleteAccount(params.id);
    },

    ...options,
  });
};

