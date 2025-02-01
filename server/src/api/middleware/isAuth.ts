import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  console.log(req.originalUrl);

  if (!accessToken)
    return res.status(498).json({
      message: "토큰이 없습니다.",
    });

  if (!config.jwtSecretKey)
    return res.status(503).json({
      message: "서버에서 Secret Key를 찾을 수 없습니다.",
    });

  jwt.verify(accessToken, config.jwtSecretKey as string, (err, payload) => {
    if (err) {
      if ((err as jwt.TokenExpiredError).expiredAt)
        return res.status(498).json({
          message: "토큰이 만료되었습니다.",
        });

      return res.status(401).json({
        message: "유효하지 않은 엑세스 토큰입니다.",
      });
    }

    req.userId = mongoose.Types.ObjectId.createFromHexString(
      (payload as JwtPayload).id
    );

    next();
  });
};
