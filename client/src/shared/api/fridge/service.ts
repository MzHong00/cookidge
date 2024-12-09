import axios from "shared/lib/axios";
import { IFridge } from "./type";
import { IUser } from "../user";

export class FridgeService {
  static readonly root = "api/refrigerator";

  static async fetchFridgeList() {
    return (await axios.get(`${this.root}/read-list`)).data;
  }

  static async fetchFridgeDetail(fridgeId?: IFridge["_id"]): Promise<IFridge> {
    return (
      await axios.get(`${this.root}/read-detail`, {
        params: { refrigerator_id: fridgeId },
      })
    ).data;
  }

  static async createFridge(fridgeName: IFridge["name"]) {
    return (await axios.post(`${this.root}/create`, { name: fridgeName })).data;
  }

  static async updateFridge(
    fridgeId?: IFridge["_id"],
    fridgeName?: IFridge["name"]
  ) {
    return (
      await axios.patch(`${this.root}/update`, {
        refrigerator_id: fridgeId,
        refrigerator_name: fridgeName,
      })
    ).data;
  }

  static async deleteFridge(fridgeId: IFridge["_id"]) {
    return (
      await axios.delete(`${this.root}/delete`, {
        data: { refrigerator_id: fridgeId },
      })
    ).data;
  }

  static async addSharedMember(
    fridgeId?: IFridge["_id"],
    memberId?: IUser["_id"]
  ) {
    return (
      await axios.patch(`${this.root}/shared-member/add`, {
        refrigerator_id: fridgeId,
        member_id: memberId,
      })
    ).data;
  }

  static async removeSharedMember(
    fridgeId?: IFridge["_id"],
    memberId?: IUser["_id"]
  ) {
    return (
      await axios.patch(`${this.root}/shared-member/remove`, {
        refrigerator_id: fridgeId,
        member_id: memberId,
      })
    ).data;
  }
}
