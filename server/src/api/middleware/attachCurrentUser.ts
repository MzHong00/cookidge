import { Request, Response, NextFunction } from "express";

import { User } from "../../models/user";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUserName = req.jwtPayload.id;

    const userData = await User.findById(currentUserName);
    if (!userData)
      res.status(401).json({ message: "로그인 상태가 아닙니다." });

    req.user = userData;
    return next();
  } catch (error) {
    console.log("attachCurrentUser 에러: ", error);
    return next();
  }
};
