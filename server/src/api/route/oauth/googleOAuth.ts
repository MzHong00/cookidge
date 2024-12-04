import { Router, Request, Response } from "express";

import { oAuthLogin } from "../../../services/auth";
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

      const googleData = await googleOauth(code as string);
      const { access_token, refresh_token } = await oAuthLogin(googleData);

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
