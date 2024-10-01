import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { paymentSessionsApiService } from "../../paymentSessionsApiService";
import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";
import { usePaymentSessionStore } from "@/store/usePaymentSessionStore";

type useGetSalesAmountByDayQueryParams = {
  id?: string;
};

export const useGetPaymentSessionAmountByDayQuery = (
  params?: useGetSalesAmountByDayQueryParams,
  options?: UseQueryOptions<PartialPaymentSessionInt, Error>
) => {
  return useQuery({
    queryKey: ["getPaymentSession", params ? params.id : null],
    queryFn: () => {
      return paymentSessionsApiService.getPaymentSessions(params?.id);
    },
    ...options,
  });
};

export const useGetAllPaymentSessionsQuery = (
  params?: useGetSalesAmountByDayQueryParams,
  options?: UseQueryOptions<PartialPaymentSessionInt[], Error>
) => {
  return useQuery({
    queryKey: ["getAllPaymentSessions"],
    queryFn: () => {
      return paymentSessionsApiService.getAllPaymentSessions();
    },
    ...options,
  });
};

export const useGetActivePaymentSessionQuery = (
  params?: null,
  options?: UseQueryOptions<PartialPaymentSessionInt[], Error>
) => {
  const setPaymentSession = usePaymentSessionStore(
    (state) => state.setPaymentSession
  );

  return useQuery<PartialPaymentSessionInt[], Error>({
    queryKey: ["getActivePaymentSession"],
    queryFn: async () => {
      const data = await paymentSessionsApiService.getActivePaymentSessions();
      if (data.length > 0) {
        setPaymentSession(data[0]);
      } else {
        setPaymentSession(null);
      }
      return data;
    },
    ...options,
  });
};
