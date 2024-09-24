import { AccountInt } from "@/types/AccountTypes";
import { http } from "./http";

export const accountsApiService = {
  async getAccounts() {
    const response = await http.get("/accounts");
    return response.data;
  },
  async getAccount(id: string) {
    const response = await http.get(`/account/${id}`);
    return response.data;
  },
  async createAccount(bulk: Partial<AccountInt>) {
    const response = await http.post("/account", bulk);
    return response.data;
  },
  async updateAccount(
    id: string,
    bulk: Partial<AccountInt> | { session: null }
  ) {
    const response = await http.put(`/account/${id}`, bulk);
    return response.data;
  },
  async deleteAccount(id: string) {
    const response = await http.delete(`/account/${id}`);
    return response.data;
  },
};
