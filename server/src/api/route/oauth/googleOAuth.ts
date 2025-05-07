import { Router } from "express";

import type { GoogleUserInfo } from "../../../interface/types";
import { signin } from "../../../services/auth";
import { googleOauth, googleOauthForm } from "../../../services/googleOAuth";

const route = Router();

export default (app: Router) => {
  app.use("/google-oauth", route);

  route.get("/login", (req, res) => {
    const reqReferer = req.headers.referer as string;
    const url = new URL(reqReferer);
    const domain = `${url.protocol}//${url.host}`;

    const googleFormUrl = googleOauthForm(domain);

    res.status(200).send(googleFormUrl);
  });

  route.get("/callback", async (req, res) => {
    try {
      const reqReferer = req.headers.referer as string;
      const url = new URL(reqReferer);
      const domain = `${url.protocol}//${url.host}`;

      const { code } = req.query as { code: string };

      const googleUserInfo: GoogleUserInfo = await googleOauth(code, domain);
      const { access_token, refresh_token } = await signin(googleUserInfo);

      res
        .status(200)
        .cookie("access_token", access_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json({ message: "토큰이 발급되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
