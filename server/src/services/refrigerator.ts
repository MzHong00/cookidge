import { IRefrigerator } from "../interface/IRefrigerator";
import { IUser } from "../interface/IUser";
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
  static async readDetail(refrigeratorId: IRefrigerator["_id"]) {
    return await Refrigerator.aggregate([
      { $match: { _id: refrigeratorId } },
      {
        $addFields: {
          allowed_user_ids: {
            $concatArrays: ["$shared_members", ["$owner_id"]],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "allowed_user_ids",
          foreignField: "_id",
          as: "allowed_users",
        },
      },
      {
        $project: {
          "allowed_users.plan": 0,
          "allowed_users.follower": 0,
          "allowed_users.following": 0,
          "allowed_users.email": 0,
          "allowed_users.created_at": 0,
        },
      },
    ]);
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

  static async updateRefrigerator(refrigeratorId: string, content: string) {
    return await Refrigerator.findByIdAndUpdate(
      refrigeratorId,
      { $set: { name: content } },
      { new: true }
    );
  }

  static async deleteRefrigerator(refrigeratorId: string) {
    return await Refrigerator.findByIdAndDelete(refrigeratorId);
  }

  static async addSharedMember(refrigeratorId: string, member: IUser["_id"]) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $addToSet: {
        shared_members: member,
      },
    });
  }

  static async removeSharedMember(
    refrigeratorId: string,
    member: IUser["_id"]
  ) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $pull: {
        shared_members: member,
      },
    });
  }
}
