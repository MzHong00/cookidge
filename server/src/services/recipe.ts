import mongoose from "mongoose";
import {
  IRecipe,
  IRecipeInput,
  IRecipeQueryOption,
  IRecipeSearchOption,
} from "../interface/IRecipe";
import { Recipe } from "../models/recipe";
import { Like } from "../models/like";
import { IUser } from "../interface/IUser";
import { mongooseTransaction } from "../lib/mongoose/transaction";
import { Comment } from "../models/comment";
import { IIngredient } from "../interface/IIngredient";

enum Sort {
  "최신순" = "_id",
  "좋아요순" = "like_count",
}

export class RecipeService {
  static async readRecipe(recipeId: string) {
    return await Recipe.aggregate([
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

  static async readRecipes(option: IRecipeSearchOption) {
    const { categories, sort = "최신순", limit = 3, offset } = option || {};

    return await Recipe.aggregate([
      {
        $match: categories
          ? {
              $or: [
                ...categories?.map((category) => ({
                  category: category,
                })),
              ],
            }
          : {},
      },
      {
        $addFields: {
          like_count: { $size: "$like_members" },
        },
      },
      { $sort: { [`${Sort[sort]}`]: -1 } },
      { $skip: offset ? Number(offset) : 0 },
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

  static async readUserRecipes(userId: IUser["_id"]) {
    return await Recipe.find(
      { author_id: userId },
      {
        _id: 1,
        pictures: 1,
      }
    );
  }

  static async createRecipe(userId: IUser["_id"], recipe: IRecipeInput) {
    return await Recipe.create({
      ...recipe,
      author_id: userId,
    });
  }

  static async updateRecipe(recipeId: string, recipe: IRecipeInput) {
    return await Recipe.findByIdAndUpdate(recipeId, recipe, { new: true });
  }

  static async deleteRecipe(recipeId: IRecipe["_id"]) {
    await Promise.all([
      Recipe.deleteOne({ _id: recipeId }),
      Comment.deleteMany({ recipe_id: recipeId }),
      Like.deleteMany({ recipe_id: recipeId }),
    ]);
  }

  static async searchRecipes(option: IRecipeQueryOption) {
    const { query, limit = 5, offset } = option || {};

    return await Recipe.aggregate([
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

  static async recommendRecipes(recommendDTO: {
    categories?: IRecipe["category"][];
    my_ingredients: IIngredient["name"][];
  }) {
    const { categories, my_ingredients } = recommendDTO;

    return await Recipe.aggregate([
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

  static async readMyLikeRecipes(userId: IUser["_id"]) {
    return await Like.aggregate([
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
          liked_recipes: {
            _id: 1,
            pictures: 1,
          },
        },
      },
    ]);
  }

  static async like(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    mongooseTransaction(async () => {
      await Recipe.findByIdAndUpdate(recipeId, {
        $addToSet: { like_members: userId },
      });

      await Like.create({ user_id: userId, recipe_id: recipeId });
    });
  }

  static async unlike(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    mongooseTransaction(async () => {
      await Recipe.findByIdAndUpdate(recipeId, {
        $pull: { like_members: userId },
      });

      await Like.deleteOne({ user_id: userId, recipe_id: recipeId });
    });
  }
}
