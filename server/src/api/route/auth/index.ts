import { Router } from "express";
import jwt from "jsonwebtoken";

import config from "../../../config";
import { issueToken } from "../../../services/auth";
import { IUser } from "../../../interface/IUser";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.get("/issue-token", async (req, res) => {
    const refreshToken = req.cookies.token as string;
    
    if (!refreshToken)
      return res.status(401).json({ isLogin: false, message: "로그인 상태가 아닙니다." });
    if (!config.jwtAccessKey)
      return res.status(503).json({ message: "서버 jwt key가 없습니다" });

    jwt.verify(refreshToken, config.jwtAccessKey, (err, payload) => {
      if (err)
        return res.status(401).json({ message: "유효하지 않은 토큰입니다." });

      const accessToken = issueToken(payload as IUser);

      return res.status(201).send({token: accessToken, payload: payload});
    });
  });
};
