import { Router, Request, Response } from "express";
import { googleOauth, googleOauthForm } from "../../../services/googleOAuth";

const route = Router();

export default (app: Router) => {
  app.use("/google-oauth", route);

  route.get("/form", (_, res: Response) => {
    const googleFormUrl = googleOauthForm();

    res.status(200).send(googleFormUrl);
  });

  route.post("/callback", async (req: Request, res: Response) => {
    try {
      const { code } = req.query;

      const googleData = await googleOauth(code as string);

      // email을 이용하여 회원인지 확인

    } catch (error) {
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
