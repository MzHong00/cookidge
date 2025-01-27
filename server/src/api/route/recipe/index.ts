import mongoose from "mongoose";
import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import isAuth from "../../middleware/isAuth";
import { upload } from "../../../loaders/multer";
import isMyRecipe from "../../middleware/isMyRecipe";
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
import cldFolder from "../../../lib/cloudinary/cloudinaryFolder";

const route = Router();

export default (app: Router) => {
  app.use("/recipe", route);

  // 레시피 상세 조회
  route.get("/read/detail/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const recipe = await RecipeService.readRecipeJoinUser(id);

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
    async (req, res) => {
      const userId = req.userId;
      const recipeInputDto = req.body as IRecipeInput;
      const { "pictures[]": pictures, ...stepPictures } = req.files as {
        "pictures[]"?: Express.Multer.File[];
        [stepPictures: string]: Express.Multer.File[] | undefined;
      };

      try {
        if (pictures) {
          recipeInputDto.pictures = (
            await CloudinaryService.uploadFiles(pictures, {
              folder: cldFolder.recipes,
            })
          )
            .map((picture) => (picture ? picture.public_id : ""))
            .filter((ids) => !!ids);
        }

        if (stepPictures) {
          const stepIndex = Object.keys(stepPictures).map((key) =>
            parseInt(key[14])
          );
          const stepPublicIds = (
            await CloudinaryService.uploadFiles(
              Object.values(stepPictures).flatMap((pic) => pic ?? []),
              { folder: cldFolder.cooking_steps }
            )
          )
            .map((cldImg) => (cldImg ? cldImg.public_id : ""))
            .filter((ids) => ids);

          stepIndex.forEach((stepIndex, publicIdIndex) => {
            if (recipeInputDto.cooking_steps)
              recipeInputDto.cooking_steps[stepIndex].picture =
                stepPublicIds[publicIdIndex];
          });
        }

        await RecipeService.createRecipe(userId, recipeInputDto);

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
    celebrate({
      [Segments.BODY]: Joi.object(recipeInputJoiSchema),
      [Segments.QUERY]: Joi.object({ _id: Joi.string() }),
    }),
    isAuth,
    isMyRecipe,
    async (req, res) => {
      const recipeId = req.query._id as string;
      const recipeInputDto = req.body as IRecipeInput;
      const { "pictures[]": pictures, ...stepPictures } = req.files as {
        "pictures[]"?: Express.Multer.File[];
        [stepPictures: string]: Express.Multer.File[] | undefined;
      };

      if (!recipeInputDto.cooking_steps) recipeInputDto.cooking_steps = [];

      try {
        const prevRecipe = (await RecipeService.readRecipeById(
          recipeId
        )) as IRecipe;

        // 요리 사진 로직
        if (pictures) {
          const picturePromise = await Promise.all([
            // 이전 이미지 저장소에서 제거
            prevRecipe?.pictures &&
              CloudinaryService.deleteFiles(prevRecipe.pictures),
            // 새로운 이미지 저장소에 업로드
            CloudinaryService.uploadFiles(pictures, {
              folder: cldFolder.recipes,
            }),
          ]);

          recipeInputDto.pictures = picturePromise[1]
            .map((picture) => (picture ? picture.public_id : ""))
            .filter((ids) => !!ids);
        }

        // 요리 과정 사진 로직
        if (stepPictures) {
          const stepIndex = Object.keys(stepPictures).map((key) =>
            parseInt(key[14])
          );

          const stepPromise = await CloudinaryService.uploadFiles(
            Object.values(stepPictures).flatMap((pic) => pic ?? []),
            { folder: cldFolder.cooking_steps }
          );

          const stepPublicIds = stepPromise
            .map((cldImg) => (cldImg ? cldImg.public_id : ""))
            .filter((ids) => !!ids);

          stepIndex.forEach((stepIndex, publicIdIndex) => {
            if (recipeInputDto.cooking_steps)
              recipeInputDto.cooking_steps[stepIndex].picture =
                stepPublicIds[publicIdIndex];
          });
        }

        const deleteTargets: string[] = [];

        // 이전과 현재의 요리과정 사진 전체 탐색
        prevRecipe.cooking_steps?.forEach((step) => {
          if (!step.picture) return;
          // 사용하지 않은 요리과정 추출
          const isUsing = recipeInputDto.cooking_steps
            ?.map((step) => step.picture || "")
            .find((url) => url === step.picture);
          if (!isUsing) deleteTargets.push(step.picture);
        });

        // 사용하지 않은 요리과정 사진 삭제
        CloudinaryService.deleteFiles(deleteTargets);

        // 레시피 업데이트
        await RecipeService.updateRecipe(recipeId, recipeInputDto);

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
