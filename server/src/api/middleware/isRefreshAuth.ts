import mongoose from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const { token: refreshToken } = req.cookies;
    
  if (!refreshToken)
    return res.status(200).json({
      message: "로그인 상태가 아닙니다.",
    });

  if (!config.jwtSecretKey)
    return res.status(503).json({
      message: "서버에서 Secret Key를 찾을 수 없습니다.",
    });

  jwt.verify(
    refreshToken as string,
    config.jwtSecretKey as string,
    (err, payload) => {
      if (err)
        return res.status(200).json({
          message: "유효하지 않은 Refresh Token입니다.",
        });

      req.userId = mongoose.Types.ObjectId.createFromHexString(
        (payload as JwtPayload).id
      );

      next();
    }
  );
};
