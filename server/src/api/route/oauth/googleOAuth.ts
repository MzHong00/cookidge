import { Router, Request, Response } from "express";

import { User } from "../../../models/user";
import { signin, signup } from "../../../services/auth";
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
      const member = await User.findOne({ email: googleData.email });
      
      const { access_token, refresh_token } = member
        ? await signin(member)
        : await signup(googleData);

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
