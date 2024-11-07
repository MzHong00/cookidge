import { Router } from "express";
import isAuth from "../../middleware/isAuth";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import {
  createRecipeJoiSchema,
  deleteRecipeJoiSchema,
  IRecipe,
  IRecipeInputDto,
  updateRecipeJoiSchema,
} from "../../../interface/IRecipe";
import { RecipeService } from "../../../services/recipe";
import { IUser } from "../../../interface/IUser";
import { celebrate, Segments } from "celebrate";
import isMyRecipe from "../../middleware/isMyRecipe";

const route = Router();

export default (app: Router) => {
  app.use("/recipe", route);

  route.get("/read", async (req, res) => {
    const recipeId = req.query.id as IRecipe["_id"];

    try {
      const recipe = await RecipeService.readRecipe(recipeId);

      if (!recipe) {
        return res.status(200).json({ message: "레시피를 찾을 수 없습니다." });
      }
      res.status(200).json(recipe);
    } catch (error) {
      console.error("레시피 읽기 중 오류 발생:", error);
      res
        .status(500)
        .json({ message: "레시피를 가져오는 중 오류가 발생했습니다." });
    }
  });

  route.get("/read-list", async (req, res) => {
    const userName = req.query.userName as IUser["name"];

    try {
      const recipes = await RecipeService.readUserRecipes(userName);

      if (!recipes) {
        return res.status(200).json({ message: "레시피를 찾을 수 없습니다." });
      }
      res.status(200).json(recipes);
    } catch (error) {
      console.error("레시피 목록 읽기 중 오류 발생:", error);
      res
        .status(500)
        .json({ message: "레시피 목록을 가져오는 중 오류가 발생했습니다." });
    }
  });

  route.post(
    "/create",
    celebrate({
      [Segments.BODY]: createRecipeJoiSchema,
    }),
    isAuth,
    attachCurrentUser,
    async (req, res) => {
      const user = req.user as IUser;
      const recipeInputDto = req.body.recipe as IRecipeInputDto;

      try {
        const recipe = await RecipeService.createRecipe(
          user._id,
          recipeInputDto
        );
        if (!recipe) {
          return res
            .status(200)
            .json({ message: "레시피 생성에 실패했습니다." });
        }
        res.status(201).json(recipe);
      } catch (error) {
        console.error("레시피 생성 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 생성 중 오류가 발생했습니다." });
      }
    }
  );

  route.patch(
    "/update",
    celebrate({ [Segments.BODY]: updateRecipeJoiSchema }),
    isAuth,
    attachCurrentUser,
    isMyRecipe,
    async (req, res) => {
      const willUpdateRecipe = req.body.recipe as IRecipe;

      try {
        const recipe = await RecipeService.updateRecipe(willUpdateRecipe);

        res.status(200).json(recipe);
      } catch (error) {
        console.error("레시피 업데이트 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 업데이트 중 오류가 발생했습니다." });
      }
    }
  );

  route.delete(
    "/delete",
    celebrate({ [Segments.BODY]: deleteRecipeJoiSchema }),
    isAuth,
    attachCurrentUser,
    isMyRecipe,
    async (req, res) => {
      const recipeId = req.body.recipe as IRecipe["_id"];

      try {
        await RecipeService.deleteRecipe(recipeId);

        res.status(200).json({ message: "레시피 삭제 성공" });
      } catch (error) {
        console.error("레시피 삭제 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 삭제 중 오류가 발생했습니다." });
      }
    }
  );
};
