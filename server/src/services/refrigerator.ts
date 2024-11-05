import { IRefrigerator } from "../interface/IRefrigerator";
import { Refrigerator } from "../models/refrigerator";

export class RefrigeratorService {
  static async createRefrigerator(
    refrigeratorName: IRefrigerator["name"],
    owner_id?: IRefrigerator["owner_id"]
  ) {
    if (!owner_id) return console.log("비로그인 상태로 냉장고 생성 요청 거부");

    const query: Partial<IRefrigerator> = {
      name: refrigeratorName,
      owner_id: owner_id,
    };

    return await Refrigerator.create(query);
  }

  static async readList(owner_id: IRefrigerator["owner_id"]) {
    return await Refrigerator.find({ owner_id }, "_id name");
  }

  static async readDetail(
    targetId: string,
    owner_id: IRefrigerator["owner_id"]
  ) {
    return await Refrigerator.findOne({
      _id: targetId,
      owner_id,
    });
  }

  static async updateRefrigerator(
    id: string,
    updateBody: Partial<IRefrigerator>,
    owner_id: IRefrigerator["owner_id"]
  ) {
    return await Refrigerator.updateOne({ _id: id, owner_id }, updateBody);
  }

  static async deleteRefrigerator(
    target: string,
    owner_id: IRefrigerator["owner_id"]
  ) {
    return await Refrigerator.deleteOne({
      _id: target,
      owner_id,
    });
  }
}
