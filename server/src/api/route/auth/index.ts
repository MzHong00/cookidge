import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../../../config";
import { issueToken } from "../../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/logout", (_, res) => {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Logged out successfully" });
  });

  route.get("/issue-token", async (req, res) => {
    const refreshToken = req.cookies.token as string;

    if (!refreshToken)
      return res
        .status(401)
        .json({ isLogin: false, message: "로그인 상태가 아닙니다." });

    if (!config.jwtSecretKey)
      return res.status(503).json({ message: "서버 jwt key가 없습니다" });

    jwt.verify(refreshToken, config.jwtSecretKey, (err, payload) => {
      if (err)
        return res.status(401).json({ message: "유효하지 않은 토큰입니다." });

      const accessToken = issueToken({ id: (payload as JwtPayload).id });

      return res
        .status(201)
        .send({ isLogin: true, token: accessToken, payload: payload });
    });
  });
};
