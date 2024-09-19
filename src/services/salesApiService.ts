import { PartialSaleInt } from "@/types/SaleTypes";
import { http } from "./http";


export const salesApiService = {
  async getSales() {
    const response = await http.get("/sale");
    return response.data;
  },

  async getSalesWithPagination(limit?:number, page?:number) {
    const response = await http.get(`/sales/pagination?page=${page || 1}&limit=${limit || 10}`);
    return response.data;
  },

  async getSalesByDay(date:string | undefined) {
    if(!date){
      return false
    }
    const response = await http.get(`/sales/${date}`);
    return response.data;
  },

  async getSaleAmountByDay(date:string | undefined, account:string | undefined) {
    if(!date){
      return false
    }
    const response = await http.get(`/sales/amount/${date}/${account}`);
    return response.data;
  },
  async createSale(bulk:PartialSaleInt) {
    const response = await http.post("/sale", bulk);
    return response.data;
  },
  async deleteSale(id:string) {
    const response = await http.delete(`/sale/${id}`);
    return response.data;
  },
  async updateSale(id:string, bulk: PartialSaleInt) {
    const response = await http.put(`/sale/${id}`, bulk);
    return response.data;
  },
  
};