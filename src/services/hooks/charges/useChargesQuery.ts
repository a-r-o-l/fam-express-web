import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { chargesApiService } from "../../chargesApiService";
import { ChargeIntPopulated } from "@/types/ChargeTypes";

type useGetChargesByDayQueryParams = {
  date?: string;
}

type useGetChargesWithPaginationQueryParams = {
  currentPage: number;
  totalPages: number;
  Charges: Partial<ChargeIntPopulated>[];
}


export const useGetChargesQuery = (
  params?: null,
  options?: UseQueryOptions<Partial<ChargeIntPopulated>[], Error>
) => {
  return useQuery({
    queryKey: ["getCharges"],
    queryFn: () => {
      return chargesApiService.getCharges();
    },
    ...options,
  });
};

export const useGetChargesWithPaginationQuery = (
  params?: {
    limit: number;
    page: number;
  },
  options?: UseQueryOptions<useGetChargesWithPaginationQueryParams, Error>
) => {
  return useQuery({
    queryKey: ["getChargesWithPag", params ? params.page : 1, params ? params.limit : 10],
    queryFn: () => {
      return chargesApiService.getChargesWithPagination(params?.limit, params?.page);
    },
    ...options,
  });
};


export const useGetChargesByDayQuery = (
  params?: useGetChargesByDayQueryParams,
  options?: UseQueryOptions<Partial<ChargeIntPopulated>[], Error>
) => {
  return useQuery({
    queryKey: ["getCharges", params ? params.date : null],
    queryFn: () => {
      return chargesApiService.getChargesByDay(params?.date);
    },
    ...options,
  });
};
