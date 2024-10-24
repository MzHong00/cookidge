import { Router } from "express";

import { signup } from "../../../services/auth";
import { IUserInputDTO } from "../../../interface/IUser";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.get("/signin", async (req, res) => {});

  route.post("/signup", async (req, res) => {
    const { user, token } = await signup(req.body as IUserInputDTO);

    res.status(201).json({ user, token });
  });

  route.post('/logout', (req, res) => {})
};
