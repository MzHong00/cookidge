import axios from "shared/lib/axios";

import { IUser } from "../user";
import { IFridge } from "./";

export class FridgeService {
  static readonly root = "api/refrigerator";

  static async fetchFridgeList() {
    try {
      return (await axios.get(`${this.root}/read-list`)).data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchFridgeDetail(fridgeId?: IFridge["_id"]): Promise<IFridge> {
    try {
      return (
        await axios.get(`${this.root}/read-detail`, {
          params: { refrigerator_id: fridgeId },
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async createFridge(
    fridgeName: IFridge["name"]
  ): Promise<{ message: string }> {
    try {
      return (await axios.post(`${this.root}/create`, { name: fridgeName }))
        .data;
    } catch (error) {
      throw error;
    }
  }

  static async updateFridge(
    fridgeId?: IFridge["_id"],
    fridgeName?: IFridge["name"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/update`, {
          refrigerator_id: fridgeId,
          refrigerator_name: fridgeName,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFridge(
    fridgeId: IFridge["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.delete(`${this.root}/delete`, {
          data: { refrigerator_id: fridgeId },
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async addSharedMember(
    fridgeId?: IFridge["_id"],
    memberId?: IUser["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/shared-member/add`, {
          refrigerator_id: fridgeId,
          member_id: memberId,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  static async removeSharedMember(
    fridgeId?: IFridge["_id"],
    memberId?: IUser["_id"]
  ): Promise<{ message: string }> {
    try {
      return (
        await axios.patch(`${this.root}/shared-member/remove`, {
          refrigerator_id: fridgeId,
          member_id: memberId,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }
}
