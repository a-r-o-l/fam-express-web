import { PartialAccountInt } from "@/types/AccountTypes";
import { http } from "./http";


type createSessionParams = {
  name: string;
  password: string;
}

export const authsApiService = {
  
  async createSession(bulk: createSessionParams) {
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