import { Router, Request, Response } from "express";

import { signin } from "../../../services/auth";
import { GoogleUserInfo } from "../../../interface/types";
import { googleOauth, googleOauthForm } from "../../../services/googleOAuth";

const route = Router();

export default (app: Router) => {
  app.use("/google-oauth", route);

  route.get("/login", (_, res: Response) => {
    const googleFormUrl = googleOauthForm();

    res.status(200).send(googleFormUrl);
  });

  route.get("/callback", async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      const  googleUserInfo: GoogleUserInfo = await googleOauth(code as string);
      
      const { access_token, refresh_token } = await signin(googleUserInfo);

      res
        .status(200)
        .cookie("token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ token: access_token });
    } catch (error) {
      console.log(error);
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
