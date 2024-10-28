import { Router, Request, Response } from "express";

import isAuth from "../../middleware/isAuth";
import { User } from "../../../models/user";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get('/me', isAuth, async (req: Request, res: Response) => {    
    const me = req.user.name;
    const user = await User.findOne({ name: me });

    res.status(200).json(user);
  })

  route.get("/find", async (req: Request, res: Response) => {
    const targetUser = req.query.target;
    const user = await User.findOne({ name: targetUser });

    res.status(200).json(user);
  });
};
