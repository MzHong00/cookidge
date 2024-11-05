import { Router } from "express";

import isAuth from "../../middleware/isAuth";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import { IIngredient } from "../../../interface/IIngredient";
import { IUser } from "../../../interface/IUser";
import { IngredientService } from "../../../services/ingredient";
import { IRefrigerator } from "../../../interface/IRefrigerator";

const route = Router();

export default (app: Router) => {
  app.use("/ingredient", route);

  route.post("/create", isAuth, attachCurrentUser, async (req, res) => {
    const userId = req.user?._id as IUser["_id"];
    const ingredients = req.body.ingredients as IIngredient[];
    const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

    try {
      const createdIngredients = await IngredientService.createIngredient(
        userId,
        refrigeratorId,
        ingredients
      );

      res.status(201).json(createdIngredients);
    } catch (error) {
      console.error("재료 생성 중 오류 발생:", error);
      res.status(500).json({ message: "재료 생성 중 오류가 발생했습니다." });
    }
  });

  route.patch("/update", isAuth, attachCurrentUser, async (req, res) => {
    const userId = req.user?._id as IUser["_id"];
    const ingredients = req.body.ingredients as IIngredient[];
    const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

    try {
      const result = await IngredientService.updateIngredients(
        userId,
        refrigeratorId,
        ingredients
      );
      if (!result) {
        return res
          .status(404)
          .json({ message: "업데이트할 재료를 찾을 수 없습니다." });
      }
      res
        .status(200)
        .json({ message: "재료가 성공적으로 업데이트되었습니다." });
    } catch (error) {
      console.error("재료 업데이트 중 오류 발생:", error);
      res
        .status(500)
        .json({ message: "재료 업데이트 중 오류가 발생했습니다." });
    }
  });

  route.delete("/delete", isAuth, attachCurrentUser, async (req, res) => {
    const userId = req.user?._id as IUser["_id"];
    const removeTargetIngredientIds = req.body
      .ingredients as IIngredient["_id"][];
    const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

    try {
      const result = await IngredientService.deleteIngredient(
        userId,
        refrigeratorId,
        removeTargetIngredientIds
      );

      if (!result) {
        return res
          .status(204)
          .json({ message: "삭제할 재료를 찾을 수 없습니다." });
      }

      res.status(200).json({ message: "재료 삭제에 성공했습니다." });
    } catch (error) {
      console.error("재료 삭제 중 오류 발생:", error);
      res.status(500).json({ message: "재료 삭제 중 오류가 발생했습니다." });
    }
  });
};
