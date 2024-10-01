import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

type PaymentSessionStore = {
  paymentsession: PartialPaymentSessionInt | null;
  setPaymentSession: (paymentsession: PartialPaymentSessionInt | null) => void;
};

export const usePaymentSessionStore = create<PaymentSessionStore>((set) => ({
  paymentsession: null,
  setPaymentSession: (paymentsession: PartialPaymentSessionInt | null) =>
    set((state) => ({ ...state, paymentsession })),
}));
