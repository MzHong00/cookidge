import { Router, Request, Response } from "express";

import isAuth from "../../middleware/isAuth";
import { User } from "../../../models/user";
import { IUser } from "../../../interface/IUser";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/me", isAuth, async (req: Request, res: Response) => {
    const meId = req.jwtPayload.id;
    const user = (await User.findById(meId)) as IUser;

    res.status(200).json(user);
  });

  route.get("/find", async (req: Request, res: Response) => {
    const targetUser = req.query.target;
    const user = await User.findOne({ name: targetUser }) as IUser;

    res.status(200).json(user);
  });
};
