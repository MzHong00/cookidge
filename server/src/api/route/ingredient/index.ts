import { Router } from "express";

import isAuth from "../../middleware/isAuth";
import isOurRefrigerator from "../../middleware/isOurRefrigerator";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import {
  deleteIngredientsJoiSchema,
  IIngredient,
  mutateIngredientsJoiSchema,
} from "../../../interface/IIngredient";
import { IngredientService } from "../../../services/ingredient";
import { IRefrigerator } from "../../../interface/IRefrigerator";
import { celebrate, Segments } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/ingredient", route);

  route.post(
    "/create",
    celebrate({ [Segments.BODY]: mutateIngredientsJoiSchema }),
    isAuth,
    attachCurrentUser,
    isOurRefrigerator,
    async (req, res) => {
      const ingredients = req.body.ingredients as IIngredient[];
      const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

      try {
        const createdIngredients = await IngredientService.createIngredient(
          refrigeratorId,
          ingredients
        );

        res.status(201).json(createdIngredients);
      } catch (error) {
        console.error("재료 생성 중 오류 발생:", error);
        res.status(500).json({ message: "재료 생성 중 오류가 발생했습니다." });
      }
    }
  );

  route.patch(
    "/update",
    celebrate({ [Segments.BODY]: mutateIngredientsJoiSchema }),
    isAuth,
    attachCurrentUser,
    isOurRefrigerator,
    async (req, res) => {
      const ingredients = req.body.ingredients as IIngredient[];
      const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

      try {
        const result = await IngredientService.updateIngredients(
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
    }
  );

  route.delete(
    "/delete",
    celebrate({ [Segments.BODY]: deleteIngredientsJoiSchema }),
    isAuth,
    attachCurrentUser,
    isOurRefrigerator,
    async (req, res) => {
      const removeIngredientIds = req.body
        .ingredientIds as IIngredient["_id"][];
      const refrigeratorId = req.body.refrigeratorId as IRefrigerator["_id"];

      try {
        const result = await IngredientService.deleteIngredient(
          refrigeratorId,
          removeIngredientIds
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
    }
  );
};
