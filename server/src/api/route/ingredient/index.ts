import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import isAuth from "../../middleware/isAuth";
import isOurRefrigerator from "../../middleware/isOurRefrigerator";
import {
  IIngredient,
  ingredientsJoiSchema,
} from "../../../interface/IIngredient";
import { IngredientService } from "../../../services/ingredient";

const route = Router();

export default (app: Router) => {
  app.use("/ingredient", route);

  route.post(
    "/create",
    celebrate({
      [Segments.QUERY]: Joi.object({
        refrigerator_id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object({
        ingredients: Joi.array().items(ingredientsJoiSchema),
      }).required(),
    }),
    isAuth,
    isOurRefrigerator,
    async (req, res) => {
      const ingredients = req.body.ingredients as IIngredient[];
      const refrigeratorId = req.query.refrigerator_id as string;

      try {
        await IngredientService.createIngredient(refrigeratorId, ingredients);

        res.status(201).json({
          message: "재료가 생성에 성공하였습니다.",
        });
      } catch (error) {
        console.error("재료 생성 중 오류 발생:", error);
        res.status(500).json({ message: "재료 생성 중 오류가 발생했습니다." });
      }
    }
  );

  route.patch(
    "/update",
    celebrate({
      [Segments.QUERY]: Joi.object({
        refrigerator_id: Joi.string().required(),
      }),
      [Segments.BODY]: Joi.object({
        ingredients: Joi.array().items(ingredientsJoiSchema),
      }).required(),
    }),
    isAuth,
    isOurRefrigerator,
    async (req, res) => {
      const ingredients = req.body.ingredients as IIngredient[];
      const refrigeratorId = req.query.refrigerator_id as string;

      try {
        await IngredientService.updateIngredients(refrigeratorId, ingredients);

        res
          .status(200)
          .json({ message: "재료 업데이트에 성공하였습니다." });
      } catch (error) {
        console.error("재료 업데이트 중 오류 발생:", error);
        res.status(500).json({ message: "재료 업데이트 오류가 발생했습니다." });
      }
    }
  );
};
