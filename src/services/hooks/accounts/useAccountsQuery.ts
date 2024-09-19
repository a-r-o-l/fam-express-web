import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { accountsApiService } from "../../accountsApiService";
import { AccountInt } from "@/types/AccountTypes";

type GetAccountQueryParams = {
  id?: string;
};

export const useGetAccountsQuery = (params?:null, options?:UseQueryOptions<Partial<AccountInt>, Error, Partial<AccountInt>[]>) => {
  return useQuery({
    queryKey: ["getAccounts"],
    queryFn: () => {
      return accountsApiService.getAccounts();
    },
    ...options,
  });
};

export const useGetAccountQuery = (
  params: GetAccountQueryParams,
  options?: UseQueryOptions<Partial<AccountInt>, Error, Partial<AccountInt>, [string, string]>
) => {
  return useQuery<Partial<AccountInt>, Error, Partial<AccountInt>, [string, string]>({
    queryKey: ["getAccount", params?.id ? params.id : ""],
    queryFn: () => {
      if (!params?.id) {
        throw new Error("Id is required");
      }
      return accountsApiService.getAccount(params.id);
    },
    ...options,
  });
};

