import { Router } from "express";

import isAuth from "../../middleware/isAuth";
import { celebrate, Joi, Segments } from "celebrate";
import { UserService } from "../../../services/user";
import {
  IUserSearchQueryOptions,
  IUserUpdateInputDTO,
} from "../../../interface/IUser";
import { CloudinaryService } from "../../../services/cloudinary";
import { RankService } from "../../../services/rank";
import { PagenationOptions } from "../../../interface/types";

const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  route.get("/me", isAuth, async (req, res) => {
    const meId = req.userId;

    try {
      const me = await UserService.readUserById(meId);

      res.status(200).json({
        user: me,
      });
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

  route.get(
    "/follower",
    celebrate({
      [Segments.QUERY]: Joi.object({
        name: Joi.string(),
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const query = req.query as unknown as PagenationOptions & {
        name: string;
      };

      try {
        const follower = await UserService.readFollowerList(query);

        res.status(200).json(follower);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "팔로워 목록을 가져오는 중 오류가 발생했습니다." });
      }
    }
  );

  route.get(
    "/following",
    celebrate({
      [Segments.QUERY]: Joi.object({
        name: Joi.string(),
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const query = req.query as unknown as PagenationOptions & {
        name: string;
      };

      try {
        const follower = await UserService.readFollowingList(query);
        res.status(200).json(follower);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "팔로워 목록을 가져오는 중 오류가 발생했습니다." });
      }
    }
  );

  route.get(
    "/rank-follower",
    celebrate({
      [Segments.QUERY]: Joi.object({
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const { limit, offset } = req.query as PagenationOptions;

      try {
        const followRank = await RankService.followRank({ limit, offset });

        res.status(200).json(followRank);
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "팔로우 랭킹을 검색하는 중 오류가 발생했습니다." });
      }
    }
  );

  route.get(
    "/rank-recipe-maker",
    celebrate({
      [Segments.QUERY]: Joi.object({
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const { limit, offset } = req.query as PagenationOptions;
      try {
        const recipeMakerRank = await RankService.RecipeMakerRank({
          limit,
          offset,
        });

        res.status(200).json(recipeMakerRank);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "레시피 메이커 랭킹을 검색하는 중 오류가 발생했습니다.",
        });
      }
    }
  );

  route.patch(
    "/update",
    celebrate({
      [Segments.BODY]: Joi.object({
        name: Joi.string(),
        introduce: Joi.any(),
        picture: Joi.string(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const { name, introduce, picture } = req.body as IUserUpdateInputDTO;

      const image = await CloudinaryService.uploadImageByBase64(picture, {
        folder: "profiles",
        transformation: { width: 200 },
      });

      try {
        await UserService.updateUser(userId, {
          ...(name && { name }),
          ...(introduce && { introduce }),
          ...(image && { picture: image.public_id }),
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
