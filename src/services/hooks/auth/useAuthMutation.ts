import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { authsApiService } from "../../authsApiService";
import { AxiosError } from "axios";
import { PartialAccountInt } from "@/types/AccountTypes";

type PartialAccountType = Partial<PartialAccountInt>

type RemakeSessionParams = {id: string}
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

export const useCreateSessionMutation = (options?: SignInMutationOptions):SignInMutationResult => {
  return useMutation<SessionResponse, AxiosError, PartialAccountType | null>({
    mutationFn: (params: PartialAccountType | null) => {
      return authsApiService.createSession(params);
    },

    ...options,
  });
};

export const useRemakeSessionMutation = (params?:null,options?: UseMutationOptions<remakeSessionResponse, Error,RemakeSessionParams, unknown >) => {
  return useMutation({
    mutationFn: (params:RemakeSessionParams) => {
      return authsApiService.createSession(params.id);
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

