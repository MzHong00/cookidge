import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { upload } from "../../middleware/multer";
import isAuth from "../../middleware/isAuth";
import isMyRecipe from "../../middleware/isMyRecipe";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import {
  createRecipeJoiSchema,
  IRecipe,
  IRecipeSearchOption,
  IRecipeInput,
  IRecipeInputDto,
  recipeInputJoiSchema,
} from "../../../interface/IRecipe";
import { IUser } from "../../../interface/IUser";
import { User } from "../../../models/user";
import { RecipeService } from "../../../services/recipe";
import { CloudinaryService } from "../../../services/cloudinary";

const route = Router();

export default (app: Router) => {
  app.use("/recipe", route);

  // 레시피 상세 조회
  route.get("/read/detail/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await RecipeService.readRecipe(id);

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

  // 레시피 목록 조회
  route.get("/read-list", async (req, res) => {
    const searchOptions = req.query as IRecipeSearchOption;

    try {
      const recipe = await RecipeService.readRecipes(searchOptions);

      if (!recipe) {
        return res.status(200).json({ message: "레시피를 찾을 수 없습니다." });
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.error("레시피 목록 읽기 중 오류 발생:", error);
      res
        .status(500)
        .json({ message: "레시피를 가져오는 중 오류가 발생했습니다." });
    }
  });

  // 유저 레시피 목록 조회
  route.get("/read/user/:userName", async (req, res) => {
    const { userName } = req.params;

    try {
      const { _id } = (await User.findOne(
        { name: userName },
        { _id: 1 }
      )) as IUser;
      const recipes = await RecipeService.readRecipesByUserId(_id);

      if (!recipes) {
        return res.status(200).json({ message: "레시피를 찾을 수 없습니다." });
      }

      res.status(200).json(recipes);
    } catch (error) {
      console.error("유저 레시피 목록 읽기 중 오류 발생:", error);
      res.status(500).json({
        message: "유저 레시피 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }
  });

  // 나의 레시피 목록 조회
  route.get("/read-list/me", isAuth,  async (req, res) => {
    const userId = req.userId;
    
    try {
      const recipes = await RecipeService.readRecipesByUserId(userId);

      if (!recipes) {
        return res.status(200).json({ message: "레시피를 찾을 수 없습니다." });
      }

      res.status(200).json(recipes);
    } catch (error) {
      console.error("나의 레시피 목록 읽기 중 오류 발생:", error);
      res.status(500).json({
        message: "나의 레시피 목록을 가져오는 중 오류가 발생했습니다.",
      });
    }
  });

  // 레시피 생성
  route.post(
    "/create",
    upload.fields([
      { name: "pictures[]" },
      { name: "cooking_step_pictures[]" },
    ]),
    celebrate(
      {
        [Segments.BODY]: createRecipeJoiSchema,
      },
      { abortEarly: false }
    ),
    isAuth,
    attachCurrentUser,
    async (req, res) => {
      const userId = req.userId;
      const recipeInputDto = req.body as IRecipeInputDto;
      const files = req.files as
        | {
            "pictures[]": Express.Multer.File[];
            "cooking_step_pictures[]": Express.Multer.File[];
          }
        | undefined;

      if (!files) return res.send();

      const pictures = await CloudinaryService.uploadFiles(files["pictures[]"]);
      const cookingStepPictures = await CloudinaryService.uploadFiles(
        files["cooking_step_pictures[]"]
      );

      const recipeInput: IRecipeInput = {
        ...recipeInputDto,
        pictures: pictures.map((picture) => picture?.url) as string[],
        cooking_steps: recipeInputDto.cooking_steps.map((step, index) => ({
          ...step,
          picture: cookingStepPictures[index]?.url,
        })),
      };

      try {
        const recipe = await RecipeService.createRecipe(userId, recipeInput);
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

  // 레시피 수정
  route.patch(
    "/update",
    celebrate({ [Segments.BODY]: Joi.object(recipeInputJoiSchema).min(1) }),
    isAuth,
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

  // 레시피 제거
  route.delete(
    "/delete",
    celebrate({ [Segments.BODY]: Joi.object({ recipe_id: Joi.string() }) }),
    isAuth,
    isMyRecipe,
    async (req, res) => {
      const { recipeId } = req.body;

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

  route.get('/read-list/like', isAuth, async(req, res) => {
    const userId = req.userId;

    try {
      const likeRecipes= await RecipeService.readMyLikeRecipes(userId);
      
      if(!likeRecipes[0]) return res.status(200).send([])

      res.status(200).json(likeRecipes[0].liked_recipes);
    } catch (error) {
      console.error("나의 좋아요 레시피 읽기 중 오류가 발생:", error);
      res.status(500).json({ message: "나의 좋아요 레시피 읽기 중 오류가 발생했습니다." });
    }
  })

  // 레시피 좋아요 추가
  route.patch(
    "/like",
    celebrate({ [Segments.BODY]: Joi.object({ recipe_id: Joi.string() }) }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const recipeId = req.body.recipe_id;

      try {
        await RecipeService.like(userId, recipeId);

        res.status(200).json({ message: "레시피 좋아요 성공" });
      } catch (error) {
        console.error("좋아요 오류 발생:", error);
        res.status(500).json({ message: "좋아요 오류가 발생했습니다." });
      }
    }
  );

  // 레시피 좋아요 제거
  route.patch(
    "/unlike",
    celebrate({ [Segments.BODY]: Joi.object({ recipe_id: Joi.string() }) }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const recipeId = req.body.recipe_id;

      try {
        const recipe = await RecipeService.unlike(userId, recipeId);

        res
          .status(200)
          .json({ message: "레시피 좋아요 취소 성공", recipe: recipe });
      } catch (error) {
        console.error("좋아요 취소 오류 발생:", error);
        res.status(500).json({ message: "좋아요 취소 오류가 발생했습니다." });
      }
    }
  );
};
