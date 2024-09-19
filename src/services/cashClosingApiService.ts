import { PartialCashClosingInt } from "@/types/CashClosingTypes";
import { http } from "./http";


export const cashClosingApiService = {
  async getCashesClosing() {
    const response = await http.get("/cashes-closing");
    return response.data;
  },
  async createCashClosing(bulk: PartialCashClosingInt) {
    const response = await http.post("/cash-closing", bulk);
    return response.data;
  },
  async getCashClosing(id:string) {
    const response = await http.get(`/cash-closing/${id}`);
    return response.data;
  },
  async deleteCashClosing(id:string) {
    const response = await http.delete(`/cash-closing/${id}`);
    return response.data;
  },

};