import { PartialAccountPopulatedInt } from "@/types/AccountTypes";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

type AccountStore = {
  account: PartialAccountPopulatedInt | null;
  accessToken: string;
  refreshToken: string;
  setAccount: (account: PartialAccountPopulatedInt) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setCloseSession: () => void;
  setCreateSession: (accessToken: string, refreshToken: string) => void;
};

export const useAccountStore = create<AccountStore>((set) => ({
  account: null,
  accessToken: "",
  refreshToken: "",
  setAccount: (account: PartialAccountPopulatedInt) =>
    set((state) => ({ ...state, account })),
  setAccessToken: (accessToken: string) =>
    set((state) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken: string) =>
    set((state) => ({ ...state, refreshToken })),
  setCloseSession: () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    set((state) => ({
      ...state,
      account: null,
      accessToken: "",
      refreshToken: "",
    }));
  },
  setCreateSession: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);
    const decodedToken = jwtDecode<PartialAccountPopulatedInt>(accessToken);
    set((state) => ({
      ...state,
      account: decodedToken,
      accessToken,
      refreshToken,
    }));
  },
}));
