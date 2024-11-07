import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import config from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.token as string;
  console.log(req.originalUrl);

  if (!refreshToken || !accessToken) return res.status(401).send("토큰 없음");
  if (!config.jwtAccessKey) return res.status(503).send("서버 secret key 없음");

  jwt.verify(accessToken, config.jwtAccessKey as string, (err, payload) => {
    if (err) {
      if ((err as jwt.TokenExpiredError).expiredAt) console.log("토큰 만료");

      return res.status(401).json({ message: err.name });
    }

    req.jwtPayload = payload;
    console.log(req.originalUrl, "끝");
    next();
  });
};
