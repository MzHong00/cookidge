import { Router } from "express";

import isAuth from "../../middleware/isAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { UserService } from "../../../services/user";
import {
  IUserSearchQueryOptions,
  IUserUpdateInputDTO,
} from "../../../interface/IUser";
import { upload } from "../../../loaders/multer";
import { CloudinaryService } from "../../../services/cloudinary";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/me", isAuth, async (req, res) => {
    const meId = req.userId;

    try {
      const me = await UserService.readUserById(meId);

      if (!me)
        return res.status(404).json({ message: "내 정보를 찾을 수 없습니다." });

      res.status(200).json(me);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "내 정보를 가져오는 중 오류가 발생했습니다." });
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
        console.log(error);
        res
          .status(500)
          .json({ message: "유저를 가져오는 중 오류가 발생했습니다." });
      }
    }
  );

  route.get(
    "/search",
    celebrate({
      [Segments.QUERY]: Joi.object({
        user_name: Joi.string().required(),
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const searchQuery = req.query as IUserSearchQueryOptions;

      try {
        const users = await UserService.searchUser(searchQuery);

        res.status(200).json(users);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "유저를 검색하는 중 오류가 발생했습니다." });
      }
    }
  );

  route.patch(
    "/update",
    upload.single("picture[]"),
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string(),
        introduce: Joi.any(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const { name, introduce } = req.body as IUserUpdateInputDTO;
      const file = req.file;

      const picture = await CloudinaryService.uploadFile(file, {
        folder: "profiles",
        transformation: { width: 200 },
      });

      try {
        await UserService.updateUser(userId, {
          ...(name && { name }),
          ...(introduce && { introduce }),
          ...(picture && { picture: picture.public_id }),
        });

        res.status(200).json({
          message: "사용자 정보 수정에 성공하였습니다.",
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "내 정보를 업데이트하는 중 오류가 발생했습니다." });
      }
    }
  );

  route.delete("/delete", isAuth, async (req, res) => {
    const userId = req.userId;

    try {
      await UserService.deleteUser(userId);

      res
        .status(200)
        .clearCookie("token")
        .json({ message: "계정이 성공적으로 삭제되었습니다." });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "계정을 삭제하는 중 오류가 발생했습니다." });
    }
  });

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
        console.log(error);
        res.status(500).json({ message: "팔로우 중 오류가 발생했습니다." });
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
        console.log(error);
        res.status(500).json({ message: "언팔로우 중 오류가 발생했습니다." });
      }
    }
  );
};
