import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config";
import { CustomJwtPayload } from "../../config/types/express";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.token as string;
  console.log(req.originalUrl);

  if (!refreshToken) {
    return res.status(401).json({
      isLogin: false,
      message: "토큰이 없습니다. 다시 로그인하세요.",
    });
  }

  if (!accessToken)
    return res.status(401).json({
      message: "토큰이 없습니다. 토큰을 재발급하세요.",
    });

  if (!config.jwtSecretKey) {
    return res.status(503).json({
      message: "서버에서 Secret Key를 찾을 수 없습니다.",
    });
  }

  jwt.verify(accessToken, config.jwtSecretKey as string, (err, payload) => {
    if (err) {
      if ((err as jwt.TokenExpiredError).expiredAt)
        return res.status(401).json({
          message: "토큰이 만료되었습니다.",
        });

      return res.status(401).json({
        message: "유효하지 않은 토큰입니다.",
      });
    }

    req.jwtPayload = payload as CustomJwtPayload;

    next();
  });
};
