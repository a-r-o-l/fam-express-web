import { PartialAccountInt } from "@/types/AccountTypes";
import { http } from "./http";


export const authsApiService = {
  
  async createSession(bulk: Partial<PartialAccountInt>) {
    const response = await http.post("/sign-in", bulk);
    return response.data;
  },

  async remakeSession(id:string) {
    const response = await http.post(`/re-sign-in/${id}`,);
    return response.data;
  },

  async openBox(id:string, bulk:PartialAccountInt) {
    const response = await http.put(`/open-box/${id}`, bulk);
    return response.data;
  },
};