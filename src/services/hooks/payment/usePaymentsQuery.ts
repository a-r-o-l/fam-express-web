import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { paymentsApiService } from "../../paymentsApiService";
import { PartialPaymentInt } from "@/types/PaymentTypes";

type useGetSalesAmountByDayQueryParams = {
  id?: string;
};

type useGetPaymentsQueryOptions = {
  cash: PartialPaymentInt[];
  transfer: PartialPaymentInt[];
};

export const useGetPaymentsQuery = (
  params?: useGetSalesAmountByDayQueryParams,
  options?: UseQueryOptions<useGetPaymentsQueryOptions, Error>
) => {
  return useQuery({
    queryKey: ["getPayments", params ? params.id : null],
    queryFn: () => {
      return paymentsApiService.getPayments(params?.id);
    },
    ...options,
  });
};
