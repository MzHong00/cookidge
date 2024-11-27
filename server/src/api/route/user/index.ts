import { Router } from "express";

import isAuth from "../../middleware/isAuth";
import { IUserInputDTO } from "../../../interface/IUser";
import { celebrate, Joi, Segments } from "celebrate";
import { UserService } from "../../../services/user";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/me", isAuth, async (req, res) => {
    const meId = req.userId;

    try {
      const me = await UserService.readUserById(meId);

      if (!me) return res.status(404).json({ message: "내 정보가 없습니다." });

      res.status(200).json(me);
    } catch (error) {
      res.status(500).json({ message: "내 정보 검색 중 오류가 발생했습니다." });
    }
  });

  route.get(
    "/find",
    celebrate({
      [Segments.QUERY]: Joi.object({ user_name: Joi.string().required() }),
    }),
    async (req, res) => {
      const userName = req.query.user_name as string;

      try {
        const user = await UserService.readUserByName(userName);

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "유저 검색 중 오류가 발생했습니다." });
      }
    }
  );

  route.patch(
    "/update",
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const { name, picture } = req.body as IUserInputDTO;

      try {
        // 로직 추가 예정
        res.status(200).json({ message: "Update route working" });
      } catch (error) {
        res.status(500).json({ message: "Error in update route" });
      }
    }
  );

  route.delete(
    "/delete/:id",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const { id } = req.params;

      try {
        const user = await UserService.deleteUser(id);

        if (!user)
          return res
            .status(200)
            .json({ message: "사용자가 존재하지 않습니다." });

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Error in delete route" });
      }
    }
  );

  route.patch(
    "/follow",
    celebrate({
      [Segments.BODY]: Joi.object({
        follow_user_id: Joi.string().required(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const { follow_user_id } = req.body;

      try {
        const user = await UserService.followUser(userId, follow_user_id);

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Error in follow route" });
      }
    }
  );

  route.patch(
    "/unfollow",
    celebrate({
      [Segments.BODY]: Joi.object({
        unfollow_user_id: Joi.string().required(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const { unfollow_user_id } = req.body;

      try {
        const user = await UserService.unfollowUser(userId, unfollow_user_id);

        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: "Error in unfollow route" });
      }
    }
  );
};
