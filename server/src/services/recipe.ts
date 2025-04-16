import mongoose from "mongoose";
import {
  IRecipe,
  IRecipeSort,
  IRecipeInput,
  IRecipeQueryOption,
  IRecipeSearchOption,
} from "../interface/IRecipe";
import { Like } from "../models/like";
import { Recipe } from "../models/recipe";
import { IUser } from "../interface/IUser";
import { Comment } from "../models/comment";
import { CloudinaryService } from "./cloudinary";
import { IIngredient } from "../interface/IIngredient";
import { mongooseTransaction } from "../lib/mongoose/transaction";

const SORT = {
  latest: "_id",
  like: "like_count",
} as const;

export class RecipeService {
  static readRecipeById(recipeId: string) {
    return Recipe.findById(recipeId);
  }

  static readRecipeJoinUserById(recipeId: string) {
    return Recipe.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId.createFromHexString(recipeId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "author_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          user: {
            introduce: 0,
            following: 0,
            plan: 0,
            created_at: 0,
          },
        },
      },
    ]);
  }

  static readRecipes(option: IRecipeSearchOption) {
    const {
      title,
      categories,
      sort = Object.keys(SORT)[0] as IRecipeSort,
      limit = 3,
      offset = 0,
    } = option || {};

    const validCategories =
      typeof categories === "string" ? [categories] : categories;

    return Recipe.aggregate([
      {
        $match: {
          ...(title && { name: { $regex: `${title}` } }),
          ...(validCategories
            ? {
                $or: [
                  ...validCategories?.map((category) => ({
                    category: category,
                  })),
                ],
              }
            : {}),
        },
      },
      {
        $addFields: {
          like_count: { $size: "$like_members" },
        },
      },
      { $sort: { [`${SORT[sort]}`]: -1 } },
      { $skip: Number(offset) },
      { $limit: Number(limit) },
      {
        $project: {
          _id: 1,
          name: 1,
          pictures: 1,
          author_id: 1,
          introduction: 1,
          cooking_time: 1,
          servings: 1,
          like_members: 1,
          created_at: 1,
        },
      },
    ]);
  }

  static readRecipesByUserId(userId: IUser["_id"]) {
    return Recipe.find({ author_id: userId });
  }

  static createRecipe(userId: IUser["_id"], recipe: IRecipeInput) {
    return Recipe.create({
      ...recipe,
      author_id: userId,
    });
  }

  static updateRecipe(recipeId: string, recipe: IRecipeInput) {
    return Recipe.findByIdAndUpdate(recipeId, recipe, { new: true });
  }

  static async deleteRecipe(recipeId: IRecipe["_id"]) {
    const deletedResults = await Promise.all([
      Recipe.findByIdAndDelete({ _id: recipeId }),
      Comment.deleteMany({ recipe_id: recipeId }),
      Like.deleteMany({ recipe_id: recipeId }),
    ]);

    // 제거된 recipe의 모든 사진들을 cloudinary에서 제거
    const deletedRecipe = deletedResults[0] as IRecipe;
    const deletePictureUrls = [
      ...(deletedRecipe.pictures || []),
      ...(deletedRecipe.cooking_steps?.map((step) => step.picture || "") || []),
    ].filter((url) => !!url);

    CloudinaryService.deleteFiles(deletePictureUrls);
  }

  static searchRecipes(option: IRecipeQueryOption) {
    const { query, limit = 5, offset } = option || {};

    return Recipe.aggregate([
      { $match: { name: { $regex: query } } },
      { $addFields: { like_count: { $size: "$like_members" } } },
      { $sort: { like_count: -1 } },
      { $skip: Number(offset) },
      { $limit: Number(limit) },
      {
        $project: {
          author_id: 0,
          ingredients: 0,
          category: 0,
          cooking_steps: 0,
        },
      },
    ]);
  }

  static recommendRecipes(recommendDTO: {
    categories?: IRecipe["category"][];
    my_ingredients: IIngredient["name"][];
  }) {
    const { categories, my_ingredients } = recommendDTO;

    return Recipe.aggregate([
      {
        $addFields: {
          matched_ingredients: {
            $setIntersection: [
              {
                $map: {
                  input: "$ingredients",
                  as: "ingredient",
                  in: "$$ingredient.name",
                },
              },
              my_ingredients,
            ],
          },
        },
      },
      {
        $addFields: {
          match_count: { $size: "$matched_ingredients" },
        },
      },
      { $sort: { match_count: -1 } },
      { $limit: 4 },
      {
        $project: {
          author_id: 0,
          ingredients: 0,
          category: 0,
          cooking_steps: 0,
          match_count: 0,
        },
      },
    ]);
  }

  static readMyLikeRecipes(userId: IUser["_id"]) {
    return Like.aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "recipes",
          localField: "recipe_id",
          foreignField: "_id",
          as: "liked_recipes",
        },
      },
      { $unwind: "$liked_recipes" },
      {
        $project: {
          _id: "$liked_recipes._id",
          pictures: "$liked_recipes.pictures",
        },
      },
    ]);
  }

  static async like(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    mongooseTransaction(async () => {
      await Promise.all([
        Recipe.findByIdAndUpdate(recipeId, {
          $addToSet: { like_members: userId },
        }),
        Like.create({ user_id: userId, recipe_id: recipeId }),
      ]);
    });
  }

  static async unlike(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    mongooseTransaction(async () => {
      await Promise.all([
        Recipe.findByIdAndUpdate(recipeId, {
          $pull: { like_members: userId },
        }),
        Like.deleteOne({ user_id: userId, recipe_id: recipeId }),
      ]);
    });
  }
}
