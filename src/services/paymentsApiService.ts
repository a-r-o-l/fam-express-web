import { http } from "./http";
import { PartialPaymentInt } from "@/types/PaymentTypes";

export const paymentsApiService = {
  async createPayment(bulk: PartialPaymentInt) {
    const response = await http.post("/payment", bulk);
    return response.data;
  },
  async updatePayment(id: string, bulk: PartialPaymentInt) {
    const response = await http.put(`/payment/${id}`, bulk);
    return response.data;
  },
  async deletePayment(id: string) {
    const response = await http.delete(`/payment/${id}`);
    return response.data;
  },

  async getPayments(id: string | undefined) {
    if (!id) {
      return false;
    }
    const response = await http.get(`/payment/${id}`);
    return response.data;
  },
};
