import { Router } from "express";
import isAuth from "../../middleware/isAuth";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import isOurRefrigerator, {
  isMyRefrigerator,
} from "../../middleware/isOurRefrigerator";
import { RefrigeratorService } from "../../../services/refrigerator";
import { IUser } from "../../../interface/IUser";
import { celebrate, Joi, Segments } from "celebrate";
import { IRefrigerator } from "../../../interface/IRefrigerator";

const route = Router();

export default (app: Router) => {
  app.use("/refrigerator", route);

  route.get("/read-list", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user as IUser;

    try {
      const refrigeratorList = await RefrigeratorService.readList(user?._id);
      res.status(200).json(refrigeratorList);
    } catch (error) {
      console.error("냉장고 목록 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  route.get(
    "/read-detail",
    isAuth,
    attachCurrentUser,
    isOurRefrigerator,
    async (req, res) => {
      const recipeId = req.query.recipeId as string;

      try {
        const refrigerator = await RefrigeratorService.readDetail(recipeId);

        res.status(200).json(refrigerator);
      } catch (error) {
        console.error("냉장고 상세 조회 중 오류:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  );

  route.post(
    "/create",
    celebrate({ [Segments.BODY]: Joi.object({ name: Joi.string() }) }),
    isAuth,
    attachCurrentUser,
    async (req, res) => {
      const user = req.user as IUser;
      const refrigeratorName = req.body.name;

      try {
        const newRefrigerator = await RefrigeratorService.createRefrigerator(
          refrigeratorName,
          user._id
        );

        if (!newRefrigerator) {
          return res
            .status(401)
            .json({ message: "냉장고 생성에 실패했습니다." });
        }

        res.status(201).json(newRefrigerator);
      } catch (error: any) {
        if (error.code === 11000) {
          console.error("중복된 필드:", error.keyValue);
          res.status(422).json({ message: "중복된 냉장고 이름입니다." });
        } else {
          console.error("냉장고 저장 중 오류가 발생했습니다:", error);
          res.status(500).json({ message: "서버 오류" });
        }
      }
    }
  );

  route.patch(
    "/update",
    celebrate({ [Segments.BODY]: Joi.object({ name: Joi.string() }) }),
    isAuth,
    attachCurrentUser,
    isOurRefrigerator,
    async (req, res) => {
      const refrigerator = req.body.fridge;

      try {
        const result = await RefrigeratorService.updateRefrigerator(
          refrigerator
        );

        res.status(200).json(result);
      } catch (error) {
        console.error("냉장고 업데이트 중 오류:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  );

  route.delete(
    "/delete",
    celebrate({ [Segments.BODY]: Joi.object({ id: Joi.string() }) }),
    isAuth,
    attachCurrentUser,
    isMyRefrigerator,
    async (req, res) => {
      const refrigeratorId = req.body.id;

      try {
        await RefrigeratorService.deleteRefrigerator(refrigeratorId);

        res.status(200).json({ message: "냉장고 삭제에 성공했습니다." });
      } catch (error) {
        console.error("냉장고 삭제 중 오류:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  );

  route.patch(
    "/add-shared-member",
    celebrate({
      [Segments.BODY]: Joi.object({
        id: Joi.string(),
        member: Joi.array().items(Joi.string()),
      }),
    }),
    isAuth,
    attachCurrentUser,
    isMyRefrigerator,
    async (req, res) => {
      const refrigeratorId = req.body.id as IRefrigerator["_id"];
      const memberId = req.body.memberId as IUser["_id"];

      try {
        const refrigerator = RefrigeratorService.addSharedMember(
          refrigeratorId,
          memberId
        );

        res.send(200).json(refrigerator);
      } catch (error) {
        console.error("냉장고 공유 멤버 설정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  );

  route.patch(
    "/remove-shared-member",
    celebrate({
      [Segments.BODY]: Joi.object({
        id: Joi.string(),
        member: Joi.array().items(Joi.string()),
      }),
    }),
    isAuth,
    attachCurrentUser,
    isMyRefrigerator,
    async (req, res) => {
      const refrigeratorId = req.body.id as IRefrigerator["_id"];
      const memberId = req.body.memberId as IUser["_id"];

      try {
        const refrigerator = RefrigeratorService.removeSharedMember(
          refrigeratorId,
          memberId
        );

        res.send(200).json(refrigerator);
      } catch (error) {
        console.error("냉장고 공유 멤버 설정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  );
};
