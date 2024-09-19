import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { servicesApiService } from "../../servicesApiService";
import { PartialServiceInt } from "@/types/ServiceTypes";

type createparamsType = PartialServiceInt
type updateparamsType = {
  id: string;
  data: PartialServiceInt;
}
type deleteServiceparamsType = {
  id: string;
}

export const useCreateServiceMutation = (params?:createparamsType, options?:UseMutationOptions<unknown,Error, createparamsType, unknown>) => {
  return useMutation({
    mutationFn: (params: createparamsType) => {
      return servicesApiService.createService(params);
    },

    ...options,
  });
};

export const useUpdateServiceMutation = (params?:updateparamsType, options?:UseMutationOptions<unknown,Error, updateparamsType, unknown>) => {
  return useMutation({
    mutationFn: (params:updateparamsType) => {
      return servicesApiService.updateService(params.id, params.data);
    },

    ...options,
  });
};

export const useDeleteServiceMutation = (params?:deleteServiceparamsType, options?:UseMutationOptions<unknown,Error, deleteServiceparamsType, unknown>) => {
  return useMutation({
    mutationFn: (params:deleteServiceparamsType) => {
      return servicesApiService.deleteService(params.id);
    },

    ...options,
  });
};

