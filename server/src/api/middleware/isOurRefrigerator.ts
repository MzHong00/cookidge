import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { Refrigerator } from "../../models/refrigerator";
import { IRefrigerator } from "../../interface/IRefrigerator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const refrigeratorId = req.query.refrigerator_id || req.body.refrigerator_id;
  
  if (!refrigeratorId)
    return res
      .status(400)
      .json({ message: "요청한 냉장고를 찾을 수 없습니다." });

  const refrigerator = await Refrigerator.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(refrigeratorId),
    $or: [{ owner_id: userId }, { shared_members: userId }],
  });

  if (!refrigerator)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};

export const isMyRefrigerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const refrigeratorId = req.body.refrigerator_id;

  const refrigerator = await Refrigerator.findOne({
    _id: refrigeratorId,
    owner_id: userId,
  }) as unknown as IRefrigerator | null;

  if (!refrigerator)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
