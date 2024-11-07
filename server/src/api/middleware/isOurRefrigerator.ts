import { Request, Response, NextFunction } from "express";

import { Refrigerator } from "../../models/refrigerator";
import { IRefrigerator } from "../../interface/IRefrigerator";

export default (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const refrigeratorId = req.body.refrigerator_id || req.body.refrigerator._id;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const refrigerator = Refrigerator.findOne({
    _id: refrigeratorId,
    $or: [
      { owner_id: userId },
      { shared_members: { $eleMatch: { $eq: userId } } },
    ],
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

export const isMyRefrigerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
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
