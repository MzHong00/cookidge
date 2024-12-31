import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../../../config";
import { issueToken, signin } from "../../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/logout", (_, res) => {
    res
      .status(200)
      .clearCookie("token", {
        sameSite: "none",
        secure: true,
      })
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

  route.get("/test-account", async (req, res) => {
    const { code } = req.query;

    if (code !== "cookidge#0820")
      return res.status(403).json({ message: "올바르지 않은 암호입니다." });

    const { access_token, refresh_token } = await signin({
      name: "cookidge",
      email: "cookidge.vercel.app",
      picture:
        "https://res.cloudinary.com/db0ls9b6a/image/upload/v1735203469/cookidge/yq0h7aydfwdg1rslshd7.png",
    });

    res
      .status(200)
      .cookie("token", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "cookidge.vercel.app"
      })
      .send({ token: access_token });
  });
};
