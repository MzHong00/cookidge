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
      .json({ message: "로그아웃에 성공했습니다." });
  });

  route.get("/issue-token", async (req, res) => {
    const refreshToken = req.cookies.token as string | undefined;

    if (!refreshToken)
      return res
        .status(401)
        .json({ message: "로그인 상태가 아닙니다." });

    if (!config.jwtSecretKey)
      return res.status(503).json({ message: "서버 jwt key가 없습니다" });

    jwt.verify(refreshToken, config.jwtSecretKey, (err, payload) => {
      if (err) {
        if ((err as jwt.TokenExpiredError).expiredAt)
          return res.status(488).json({
            message: "토큰이 만료되었습니다. 다시 로그인 해주세요.",
          });

        return res.status(401).json({
          message: "유효하지 않은 리프레시 토큰입니다.",
        });
      }

      const accessToken = issueToken({ id: (payload as JwtPayload).id });

      return res.status(201).send({ token: accessToken });
    });
  });

  route.post("/test-account", async (req, res) => {
    const { code } = req.body;

    if (code !== "5789")
      return res.status(401).json({ message: "올바르지 않은 코드입니다." });

    try {
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
          sameSite: "strict",
        })
        .send({ token: access_token });
    } catch (error) {
      return res.status(401).json({ message: "올바르지 않은 코드입니다." });
    }
  });
};
