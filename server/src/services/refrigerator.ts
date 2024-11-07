import { IRefrigerator } from "../interface/IRefrigerator";
import { IUser } from "../interface/IUser";
import { Refrigerator } from "../models/refrigerator";

export class RefrigeratorService {
  static async readList(userId: IRefrigerator["owner_id"]) {
    return await Refrigerator.find(
      {
        $or: [
          { owner_id: userId },
          { shared_members: { $eleMatch: { $eq: userId } } },
        ],
      },
      "_id name"
    );
  }

  static async readDetail(refrigeratorId: IRefrigerator["_id"]) {
    return await Refrigerator.findById(refrigeratorId);
  }

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

  static async deleteRefrigerator(refrigeratorId: IRefrigerator["_id"]) {
    return await Refrigerator.deleteOne({
      _id: refrigeratorId,
    });
  }

  static async addSharedMember(
    refrigeratorId: IRefrigerator["_id"],
    member: IUser["_id"]
  ) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $push: {
        shared_members: member,
      },
    });
  }

  static async removeSharedMember(
    refrigeratorId: IRefrigerator["_id"],
    member: IUser["_id"]
  ) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $pull: {
        shared_members: member,
      },
    });
  }
}
