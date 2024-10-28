import { Router, Request, Response } from "express";

import { googleOauth, googleOauthForm } from "../../../services/googleOAuth";
import { issueToken, oAuthLogin } from "../../../services/auth";

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
      const refreshToken = await oAuthLogin(googleData);
      const accessToken = issueToken(googleData);

      res
        .status(200)
        .cookie("token", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .send({token: accessToken});
    } catch (error) {
      console.log(error);
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
