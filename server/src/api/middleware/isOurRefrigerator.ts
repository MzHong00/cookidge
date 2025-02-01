import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { Refrigerator } from "../../models/refrigerator";
import { IRefrigerator } from "../../interface/IRefrigerator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const refrigeratorId = req.query.refrigerator_id || req.body.refrigerator_id;

  try {
    if (!refrigeratorId) throw new Error("우리의 냉장고 검증 에러");

    const refrigerator = await Refrigerator.findOne({
      _id: mongoose.Types.ObjectId.createFromHexString(refrigeratorId),
      $or: [{ owner_id: userId }, { shared_members: userId }],
    });

    if (!refrigerator)
      return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

    next();
  } catch (error) {
    console.error(error);
    
    return res
      .status(404)
      .json({ message: "요청한 냉장고를 찾을 수 없습니다." });
  }
};

export const isMyRefrigerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const refrigeratorId = req.body.refrigerator_id;

  const refrigerator = (await Refrigerator.findOne({
    _id: refrigeratorId,
    owner_id: userId,
  })) as unknown as IRefrigerator | null;

  if (!refrigerator)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
