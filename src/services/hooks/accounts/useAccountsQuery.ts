import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { accountsApiService } from "../../accountsApiService";
import { AccountInt, PartialAccountPopulatedInt } from "@/types/AccountTypes";

type GetAccountQueryParams = {
  id?: string;
};

export const useGetAccountsQuery = (
  params?: null,
  options?: UseQueryOptions<Partial<AccountInt>, Error, Partial<AccountInt>[]>
) => {
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
  options?: UseQueryOptions<
    PartialAccountPopulatedInt,
    Error,
    PartialAccountPopulatedInt,
    [string, string]
  >
) => {
  return useQuery<
    PartialAccountPopulatedInt,
    Error,
    PartialAccountPopulatedInt,
    [string, string]
  >({
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
