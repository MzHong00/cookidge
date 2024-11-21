import mongoose from "mongoose";

import { IRefrigerator } from "../interface/IRefrigerator";
import { Refrigerator } from "../models/refrigerator";

export class RefrigeratorService {
  // 냉장고 리스트 읽기
  static async readList(userId: IRefrigerator["owner_id"]) {
    return await Refrigerator.find(
      {
        $or: [{ owner_id: userId }, { shared_members: userId }],
      },
      "_id name"
    );
  }

  // 냉장고 자세히 읽기
  static async readDetail(refrigeratorId: string) {
    return await Refrigerator.findById(
      mongoose.Types.ObjectId.createFromHexString(refrigeratorId)
    );
  }

  // 냉장고 생성
  static async createRefrigerator(
    refrigeratorName: IRefrigerator["name"],
    owner_id: IRefrigerator["owner_id"]
  ) {
    return await Refrigerator.create({
      name: refrigeratorName,
      owner_id: owner_id,
    });
  }

  static async updateRefrigerator(refrigerator: Partial<IRefrigerator>) {
    return await Refrigerator.findByIdAndUpdate(
      refrigerator._id,
      refrigerator,
      {
        new: true,
      }
    );
  }

  static async deleteRefrigerator(refrigeratorId: string) {
    return await Refrigerator.findByIdAndDelete(refrigeratorId);
  }

  static async addSharedMember(refrigeratorId: string, member: string) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $push: {
        shared_members: member,
      },
    });
  }

  static async removeSharedMember(refrigeratorId: string, member: string) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $pull: {
        shared_members: member,
      },
    });
  }
}
