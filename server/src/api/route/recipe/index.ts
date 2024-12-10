import { Router } from "express";
import mongoose from "mongoose";
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
      { name: "cooking_step_pictures[]" },
    ]),
    celebrate(
      {
        [Segments.BODY]: recipeInputJoiSchema,
      },
      { abortEarly: false }
    ),
    isAuth,
    attachCurrentUser,
    async (req, res) => {
      const userId = req.userId;
      const recipeInputDto = req.body as IRecipeInput & {
        cooking_step_instructions?: string[];
        cooking_step_pictures?: string[];
      };
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
        pictures: pictures?.map((picture) => picture?.url) as string[],
        cooking_steps: recipeInputDto.cooking_steps?.map((step, index) => ({
          ...step,
          picture: cookingStepPictures?.[index]?.url,
        })),
      };

      try {
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
  route.put("/update", upload.any(), isAuth, isMyRecipe, async (req, res) => {
    const recipeId = req.query._id as string;
    const recipeInputDto = req.body as IRecipeInput & {
      cooking_step_instructions?: string[];
      cooking_step_pictures?: string[];
    };
    const files = req.files as Express.Multer.File[];

    const cookingStepPictureKeys = Object.keys(recipeInputDto).filter((key) =>
      key.includes("cooking_step_pictures")
    );
    const cookingStepArray = cookingStepPictureKeys.map(
      (key) =>
        recipeInputDto[
          key as keyof (IRecipeInput & {
            cooking_step_instructions?: string[];
            cooking_step_pictures?: string[];
          })
        ]
    ) as string[];

    // multer로 받은 picture 배열
    const pictureFiles = files?.filter((file) =>
      file.fieldname.includes("pictures")
    );
    const pictures = await CloudinaryService.uploadFiles(pictureFiles);

    // multer로 받은 file 배열
    const cookingStepFiles = files?.filter((file) =>
      file.fieldname.includes("cooking_step_pictures")
    );
    // file들의 index 배열
    const cookingStepFilesIndex = cookingStepFiles.map((file) =>
      Number(file.fieldname.slice(-1))
    );
    // cloudinary 업로드된 사진들
    const cookingStepPictures = await CloudinaryService.uploadFiles(
      cookingStepFiles
    );
    // index와 업로드된 사진을 통해 cookingStepArray에 순서에 맞게 밀어넣기
    cookingStepPictures?.forEach((picture, index) => {
      cookingStepArray.splice(
        cookingStepFilesIndex[index],
        0,
        `${picture?.url}`
      );
    });
    // Cooking Step을 만듦
    const newCookingSteps =
      typeof recipeInputDto.cooking_step_instructions === "string"
        ? [
            {
              picture: cookingStepArray[0],
              instruction: recipeInputDto.cooking_step_instructions,
            },
          ]
        : recipeInputDto.cooking_step_instructions?.map(
            (instruction, index) => ({
              picture: cookingStepArray[index],
              instruction: instruction,
            })
          );

    const recipe: IRecipeInput = {
      name: recipeInputDto.name,
      introduction: recipeInputDto.introduction,
      category: recipeInputDto.category,
      cooking_time: recipeInputDto.cooking_time,
      servings: recipeInputDto.servings,
      ingredients: JSON.parse(recipeInputDto.ingredients as unknown as string),
      pictures:
        recipeInputDto.pictures ||
        (pictures?.map((picture) => picture?.url) as string[]),
      cooking_steps: newCookingSteps || [],
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
  });

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
