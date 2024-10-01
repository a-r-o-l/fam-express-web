import { PartialPaymentSessionInt } from "@/types/PaymentSessionTypes";
import { http } from "./http";

export const paymentSessionsApiService = {
  async createPaymentSession(bulk: PartialPaymentSessionInt) {
    const response = await http.post("/payment-session", bulk);
    return response.data;
  },
  async updatePaymentSession(id: string, bulk: PartialPaymentSessionInt) {
    const response = await http.put(`/payment-session/${id}`, bulk);
    return response.data;
  },
  async deletePaymentSession(id: string) {
    const response = await http.delete(`/payment-session/${id}`);
    return response.data;
  },

  async getPaymentSessions(id: string | undefined) {
    if (!id) {
      return false;
    }
    const response = await http.get(`/payment-session/${id}`);
    return response.data;
  },

  async getAllPaymentSessions() {
    const response = await http.get("/payment-session/all");
    return response.data;
  },

  async getActivePaymentSessions() {
    const response = await http.get("/payment-session/active");
    return response.data;
  },
};
