import { PartialServiceInt } from "@/types/ServiceTypes";
import { http } from "./http";


export const servicesApiService = {
  async getServices() {
    const response = await http.get("/service");
    return response.data;
  },
  async createService(bulk: PartialServiceInt) {
    const response = await http.post("/service", bulk);
    return response.data;
  },
  async updateService(id:string, data:PartialServiceInt) {
    const response = await http.put(`/service/${id}`, data);
    return response.data;
  },
  async deleteService(id:string | undefined) {
    if (!id) {
      throw new Error("Id es requerido");
    }
    const response = await http.delete(`/service/${id}`);
    return response.data;
  }
};