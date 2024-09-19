import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { servicesApiService } from "../../servicesApiService";
import { ServiceInt } from "@/types/ServiceTypes";


export const useGetServicesQuery = (params?:null, options?:UseQueryOptions<ServiceInt[], Error> ) => {
  return useQuery({
    queryKey: ["getServices"],
    queryFn: () => {
      return servicesApiService.getServices();
    },
    ...options,
  });
};

