import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { authsApiService } from "../../authsApiService";
import { AxiosError } from "axios";
import { PartialAccountInt } from "@/types/AccountTypes";

type PartialAccountType = PartialAccountInt

type createSessionParams = {
  name: string;
  password: string;
}

type OpenBoxParams = {id: string, bulk:PartialAccountInt}

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
}

export interface remakeSessionResponse {
  accessToken: string;
}

export type SignInMutationOptions = UseMutationOptions<SessionResponse, AxiosError, PartialAccountType | null>;
  export type SignInMutationResult = UseMutationResult<SessionResponse, AxiosError, PartialAccountType | null>;

  
  export const useCreateSessionMutation = (options?: UseMutationOptions<SessionResponse, AxiosError, createSessionParams>) => {
    return useMutation<SessionResponse, AxiosError, createSessionParams>({
      mutationFn: (params: createSessionParams) => {
        return authsApiService.createSession(params);
      },
      ...options,
    });
  };


export const useOpenBoxMutation = (params?:null,options?: UseMutationOptions<remakeSessionResponse, Error,OpenBoxParams, unknown >) => {
  return useMutation({
    mutationFn: (params:OpenBoxParams) => {
      return authsApiService.openBox(params.id, params.bulk);
    },

    ...options,
  });
};

