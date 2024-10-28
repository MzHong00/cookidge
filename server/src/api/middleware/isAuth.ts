import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import config from "../../config";

export default (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.token as string;

  if (!refreshToken || !accessToken)
    return res
      .status(401)
      .json({ isLogin: false, message: "로그인 상태가 아닙니다." });

  if (!config.jwtAccessKey)
    return res
      .status(503)
      .json({ message: "서버의 jwt key가 존재하지 않습니다." });

  jwt.verify(accessToken, config.jwtAccessKey, (err, payload) => {
    if (err) {
      console.log(err.name);
      return res.status(401).json({ message: err.name });
    }

    req.user = payload;
    next();
  });
};
