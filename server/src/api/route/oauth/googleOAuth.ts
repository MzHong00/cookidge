import { Router } from "express";

import type { GoogleUserInfo } from "../../../interface/types";
import { signin } from "../../../services/auth";
import { googleOauth, googleOauthForm } from "../../../services/googleOAuth";

const route = Router();

export default (app: Router) => {
  app.use("/google-oauth", route);

  route.get("/login", (req, res) => {
    const reqHost = req.headers["x-forwarded-host"] as string;
    console.log(reqHost);
    
    const googleFormUrl = googleOauthForm(reqHost);

    res.status(200).send(googleFormUrl);
  });

  route.get("/callback", async (req, res) => {
    try {
      const reqHost = req.headers["x-forwarded-host"] as string;
      console.log(reqHost);

      const { code } = req.query as { code: string };

      const googleUserInfo: GoogleUserInfo = await googleOauth(code, reqHost);
      const { access_token, refresh_token } = await signin(googleUserInfo);

      res
        .status(200)
        .cookie("token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .send({ token: access_token });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
