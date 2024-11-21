import axios from "shared/api/axiosBase";

import { IFridge } from "./type";

export class FridgeService {
  static readonly root = "api/refrigerator";

  static async fetchFridgeListQuery() {
    return (await axios.get(`${this.root}/read-list`)).data;
  }

  static async fetchFridgeDetailQuery(id?: IFridge["_id"]) {
    return (
      await axios.get(`${this.root}/read-detail`, {
        params: { refrigerator_id: id },
      })
    ).data;
  }

  static async createFridgeMutation(fridgeName: IFridge["name"]) {
    return (await axios.post(`${this.root}/create`, { name: fridgeName })).data;
  }

  static async updateFridgeMutation(fridge: IFridge) {
    return (await axios.patch(`${this.root}/update`, { refrigerator: fridge }))
      .data;
  }

  static async deleteFridgeMutation(id: IFridge["_id"]) {
    return await axios.delete(`${this.root}/delete`, { data: { id: id } });
  }
}
