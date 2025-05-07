import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

import type { Cookies } from "../../interface/types";
import config from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.originalUrl);

  const { access_token, refresh_token } = req.cookies as Cookies;

  if (!refresh_token)
    return res.status(200).json({
      message: "로그인 상태가 아닙니다.",
    });

  if (!access_token)
    return res.status(498).json({
      message: "토큰이 없습니다.",
    });

  if (!config.jwtSecretKey)
    return res.status(503).json({
      message: "서버에서 Secret Key를 찾을 수 없습니다.",
    });

  jwt.verify(access_token, config.jwtSecretKey, (err, payload) => {
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
