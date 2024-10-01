import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { salesApiService } from "../../salesApiService";
import { SaleIntPopulated } from "@/types/SaleTypes";

type useGetSalesByDayQueryParams = {
  date?: string;
};

type useGetSalesAmountByDayQueryParams = {
  sessionId?: string;
  account?: string;
};

type useGetSalesWithPaginationQueryParams = {
  currentPage: number;
  totalPages: number;
  sales: Partial<SaleIntPopulated>[];
};

export const useGetSalesQuery = (
  params?: null,
  options?: UseQueryOptions<Partial<SaleIntPopulated>[], Error>
) => {
  return useQuery({
    queryKey: ["getSales"],
    queryFn: () => {
      return salesApiService.getSales();
    },
    ...options,
  });
};

export const useGetSalesWithPaginationQuery = (
  params?: {
    limit: number;
    page: number;
    account?: string;
    service?: string;
  },
  options?: UseQueryOptions<useGetSalesWithPaginationQueryParams, Error>
) => {
  return useQuery({
    queryKey: [
      "getSalesWithPag",
      params ? params.page : 1,
      params ? params.limit : 100,
      params ? params.account : "",
      params ? params.service : "",
    ],
    queryFn: () => {
      return salesApiService.getSalesWithPagination(
        params?.limit,
        params?.page,
        params?.account,
        params?.service
      );
    },
    ...options,
  });
};

export const useGetSalesByDayQuery = (
  params?: useGetSalesByDayQueryParams,
  options?: UseQueryOptions<Partial<SaleIntPopulated>[], Error>
) => {
  return useQuery({
    queryKey: ["getSales", params ? params.date : null],
    queryFn: () => {
      return salesApiService.getSalesByDay(params?.date);
    },
    ...options,
  });
};

export const useGetSalesAmountByDayQuery = (
  params?: useGetSalesAmountByDayQueryParams,
  options?: UseQueryOptions<{ totalAmount: number }, Error>
) => {
  return useQuery({
    queryKey: [
      "getSales",
      params ? params.sessionId : null,
      params ? params.account : null,
    ],
    queryFn: () => {
      return salesApiService.getSaleAmountByDay(
        params?.sessionId,
        params?.account
      );
    },
    ...options,
  });
};
