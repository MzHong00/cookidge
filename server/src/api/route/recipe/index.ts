import mongoose from "mongoose";
import { Router } from "express";
import { UploadApiResponse } from "cloudinary";
import { celebrate, Joi, Segments } from "celebrate";

import { upload } from "../../middleware/multer";
import isAuth from "../../middleware/isAuth";
import isMyRecipe from "../../middleware/isMyRecipe";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import {
  IRecipeSearchOption,
  IRecipeInput,
  recipeInputJoiSchema,
  IRecipeQueryOption,
  IRecipe,
} from "../../../interface/IRecipe";
import { IUser } from "../../../interface/IUser";
import { User } from "../../../models/user";
import { RecipeService } from "../../../services/recipe";
import { CloudinaryService } from "../../../services/cloudinary";
import { IIngredient } from "../../../interface/IIngredient";

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
  route.get(
    "/read-list",
    celebrate({
      [Segments.QUERY]: Joi.object({
        categories: Joi.array().items(Joi.string()),
        sort: Joi.string(),
        limit: Joi.string(),
        offset: Joi.string(),
      }),
    }),
    async (req, res) => {
      const searchOptions = req.query as IRecipeSearchOption;

      try {
        const recipe = await RecipeService.readRecipes(searchOptions);

        if (!recipe) {
          return res
            .status(200)
            .json({ message: "레시피를 찾을 수 없습니다." });
        }

        res.status(200).json(recipe);
      } catch (error) {
        console.error("레시피 목록 읽기 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피를 가져오는 중 오류가 발생했습니다." });
      }
    }
  );

  // 유저 레시피 목록 조회
  route.get("/read/user/:userName", async (req, res) => {
    const { userName } = req.params;

    try {
      const { _id } = (await User.findOne(
        { name: userName },
        { _id: 1 }
      )) as IUser;

      const recipes = await RecipeService.readUserRecipes(_id);

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
  route.get("/read-list/me", isAuth, async (req, res) => {
    const userId = req.userId;

    try {
      const recipes = await RecipeService.readUserRecipes(userId);

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
      ...Array.from({ length: 10 }, (_, i) => ({
        name: `cooking_steps[${i}][picture]`,
        maxCount: 1,
      })),
    ]),
    celebrate({ [Segments.BODY]: recipeInputJoiSchema }),
    isAuth,
    attachCurrentUser,
    async (req, res) => {
      const userId = req.userId;
      const recipeInputDto = req.body as IRecipeInput;
      const { "pictures[]": pictures = [], ...stepBinaryPictures } =
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

      const uploadedPictures = (await CloudinaryService.uploadFiles(
        pictures
      )) as UploadApiResponse[];

      const uploadedStepPictures = (await CloudinaryService.uploadFiles(
        Object.values(stepBinaryPictures).flat()
      )) as UploadApiResponse[];

      try {
        const recipeInput: IRecipeInput = {
          ...recipeInputDto,
          pictures: uploadedPictures.map((picture) => picture.secure_url),
          cooking_steps: recipeInputDto.cooking_steps.map((step, index) => ({
            ...step,
            picture: uploadedStepPictures[index].secure_url,
          })),
        };

        await RecipeService.createRecipe(userId, recipeInput);

        res.status(201).json({ message: "레시피 생성에 성공하였습니다." });
      } catch (error) {
        console.error("레시피 생성 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 생성 중 오류가 발생했습니다." });
      }
    }
  );

  // 레시피 수정
  route.put(
    "/update",
    upload.fields([
      { name: "pictures[]" },
      ...Array.from({ length: 10 }, (_, i) => ({
        name: `cooking_steps[${i}][picture]`,
        maxCount: 1,
      })),
    ]),
    celebrate(
      {
        [Segments.BODY]: Joi.object(recipeInputJoiSchema),
        [Segments.QUERY]: Joi.object({ _id: Joi.string() }),
      },
      { abortEarly: false }
    ),
    isAuth,
    isMyRecipe,
    async (req, res) => {
      const recipeId = req.query._id as string;
      const recipeInputDto = req.body as IRecipeInput;
      const { "pictures[]": binaryPictures = [], ...stepBinaryPictures } =
        req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

      console.log(recipeInputDto);

      const uploadedPictureUrls = (
        (await CloudinaryService.uploadFiles(
          binaryPictures
        )) as UploadApiResponse[]
      ).map((res) => res.secure_url);

      const uploadedStepPictureUrls = (
        (await CloudinaryService.uploadFiles(
          Object.values(stepBinaryPictures).flat()
        )) as UploadApiResponse[]
      ).map((res) => res.secure_url);

      const recipe: IRecipeInput = {
        ...recipeInputDto,
        ...(uploadedPictureUrls.length !== 0 && {
          pictures: uploadedPictureUrls,
        }),
        cooking_steps: recipeInputDto.cooking_steps.map((step) => ({
          instruction: step.instruction,
          picture: step.picture
            ? step.picture
            : uploadedStepPictureUrls.splice(0, 1)[0],
        })),
      };

      try {
        await RecipeService.updateRecipe(recipeId, recipe);

        res.status(200).json({ message: "레시피 업데이트에 성공했습니다." });
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
      const recipeId = req.query._id as string;

      try {
        await RecipeService.deleteRecipe(
          mongoose.Types.ObjectId.createFromHexString(recipeId)
        );

        res.status(200).json({ message: "레시피 삭제를 성공했습니다." });
      } catch (error) {
        console.error("레시피 삭제 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 삭제 중 오류가 발생했습니다." });
      }
    }
  );

  // 레시피 검색
  route.get("/search", async (req, res) => {
    const queryOptions = req.query as IRecipeQueryOption;

    try {
      const recipes = await RecipeService.searchRecipes(queryOptions);

      res.status(200).json(recipes);
    } catch (error) {
      console.error("레시피 검색 중 오류 발생:", error);
      res.status(500).json({ message: "레시피 검색 중 오류가 발생했습니다." });
    }
  });

  // 레시피 추천
  route.get(
    "/recommend",
    celebrate({
      [Segments.QUERY]: Joi.object({
        categories: Joi.array().items(Joi.string()),
        my_ingredients: Joi.array().items(Joi.string()),
      }),
    }),
    async (req, res) => {
      const recipeRecommendDTO = req.query as {
        categories?: IRecipe["category"][];
        my_ingredients: IIngredient["name"][];
      };

      try {
        const recipes = await RecipeService.recommendRecipes(
          recipeRecommendDTO
        );

        res.status(200).json(recipes);
      } catch (error) {
        console.error("레시피 추천 중 오류 발생:", error);
        res
          .status(500)
          .json({ message: "레시피 추천 중 오류가 발생했습니다." });
      }
    }
  );

  // 나의 좋아요 레시피 가져오기
  route.get("/read-list/like", isAuth, async (req, res) => {
    const userId = req.userId;

    try {
      const likeRecipes = await RecipeService.readMyLikeRecipes(userId);

      res.status(200).json(likeRecipes);
    } catch (error) {
      console.error("나의 좋아요 레시피 읽기 중 오류가 발생:", error);
      res
        .status(500)
        .json({ message: "나의 좋아요 레시피 읽기 중 오류가 발생했습니다." });
    }
  });

  // 레시피 좋아요 추가
  route.patch(
    "/like",
    celebrate({ [Segments.BODY]: Joi.object({ recipe_id: Joi.string() }) }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const recipeId = req.body.recipe_id as string;

      try {
        await RecipeService.like(
          userId,
          mongoose.Types.ObjectId.createFromHexString(recipeId)
        );

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
      const recipeId = req.body.recipe_id as string;

      try {
        await RecipeService.unlike(
          userId,
          mongoose.Types.ObjectId.createFromHexString(recipeId)
        );

        res.status(200).json({ message: "레시피 좋아요 취소 성공" });
      } catch (error) {
        console.error("좋아요 취소 오류 발생:", error);
        res.status(500).json({ message: "좋아요 취소 오류가 발생했습니다." });
      }
    }
  );
};
