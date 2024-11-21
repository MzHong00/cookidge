import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { Refrigerator } from "../../models/refrigerator";
import { IRefrigerator } from "../../interface/IRefrigerator";

export default async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.jwtPayload.id;
  const refrigeratorId = req.query.refrigerator_id || req.body.refrigerator._id;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });
  if (!refrigeratorId)
    return res
      .status(400)
      .json({ message: "요청한 냉장고를 찾을 수 없습니다." });

  const refrigerator = await Refrigerator.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(refrigeratorId),
    $or: [{ owner_id: userId }, { shared_members: userId }],
  });

  if (!refrigerator)
    return res.status(404).json({ message: "냉장고를 찾을 수 없습니다." });

  const isAuthorized =
    refrigerator.owner_id === userId ||
    refrigerator.shared_members.includes(userId);

  if (!isAuthorized)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};

export const isMyRefrigerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.jwtPayload.id;
  const refrigeratorId = req.body.refrigerator_id || req.body.refrigerator._id;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const refrigerator = Refrigerator.findOne({
    _id: refrigeratorId,
    owner_id: userId,
  }) as unknown as IRefrigerator | null;

  if (!refrigerator) {
    return res.status(200).json({ message: "냉장고를 찾을 수 없습니다." });
  }

  const isAuthorized =
    refrigerator.owner_id.toString() === userId.toString() ||
    refrigerator.shared_members.includes(userId);

  if (!isAuthorized)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
