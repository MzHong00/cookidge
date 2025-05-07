import { IRefrigerator } from "../interface/IRefrigerator";
import { IUser } from "../interface/IUser";
import { Refrigerator } from "../models/refrigerator";

export class RefrigeratorService {
  // 냉장고 리스트 읽기
  static readList(userId: IRefrigerator["owner_id"]) {
    return Refrigerator.find(
      {
        $or: [{ owner_id: userId }, { shared_members: userId }],
      },
      "_id name last_updated stored_ingredients"
    );
  }

  // 냉장고 자세히 읽기
  static readDetail(refrigeratorId: IRefrigerator["_id"]) {
    return Refrigerator.aggregate([
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
  static createRefrigerator(
    refrigeratorName: IRefrigerator["name"],
    owner_id: IRefrigerator["owner_id"]
  ) {
    return Refrigerator.create({
      name: refrigeratorName,
      owner_id: owner_id,
    });
  }

  static updateRefrigerator(refrigeratorId: string, content: string) {
    return Refrigerator.findByIdAndUpdate(
      refrigeratorId,
      { $set: { name: content } },
      { new: true }
    );
  }

  static deleteRefrigerator(refrigeratorId: string) {
    return Refrigerator.findByIdAndDelete(refrigeratorId);
  }

  static addSharedMember(refrigeratorId: string, memberId: IUser["_id"]) {
    return Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $addToSet: {
        shared_members: memberId,
      },
    });
  }

  static removeSharedMember(refrigeratorId: string, member: IUser["_id"]) {
    return Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $pull: {
        shared_members: member,
      },
    });
  }
}
