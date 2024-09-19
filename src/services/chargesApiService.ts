import { http } from "./http";


export const chargesApiService = {
  async getCharges() {
    const response = await http.get("/charges");
    return response.data;
  },

  async getChargesWithPagination(limit?:number, page?:number) {
    const response = await http.get(`/charges/pagination?page=${page || 1}&limit=${limit || 10}`);
    return response.data;
  },

  async getChargesByDay(date:string | undefined) {
    if(!date){
      return false
    }
    const response = await http.get(`/charges/${date}`);
    return response.data;
  },

  async createCharge(bulk) {
    const response = await http.post("/charge", bulk);
    return response.data;
  },

};