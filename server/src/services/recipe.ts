import mongoose from "mongoose";
import {
  IRecipe,
  IRecipeInput,
  IRecipeSearchOption,
} from "../interface/IRecipe";
import { Recipe } from "../models/recipe";
import { Like } from "../models/like";
import { IUser } from "../interface/IUser";

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
      {
        $project: {
          user: {
            introduce: 0,
            following: 0,
            plan: 0,
            created_at:0
          }
        }
      }
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

  static async readRecipesByUserId(userId: IUser["_id"]) {
    return await Recipe.find(
      { author_id: userId },
      {
        _id: 1,
        name: 1,
        pictures: 1,
        author_id: 1,
        introduction: 1,
        like_members: 1,
        created_at: 1,
      }
    );
  }

  static async createRecipe(userId: IUser["_id"], recipe: IRecipeInput) {
    return await Recipe.create({
      ...recipe,
      author_id: userId,
    });
  }

  static async updateRecipe(recipe: IRecipe) {
    return await Recipe.findByIdAndUpdate(recipe._id, recipe, { new: true });
  }

  static async deleteRecipe(recipeId: IRecipe["_id"]) {
    return await Recipe.findByIdAndDelete(recipeId);
  }

  static async readMyLikeRecipes(userId: IUser["_id"]) {
    return await Like.aggregate([
      { $match: { user_id: userId } },
      {
        $lookup: {
          from: "recipes",
          localField: "like_recipe_ids",
          foreignField: "_id",
          as: "liked_recipes",
        },
      },
    ]);
  }

  static async like(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      await Recipe.findByIdAndUpdate(recipeId, {
        $push: { like_members: userId },
      });

      await Like.findOneAndUpdate(
        { user_id: userId },
        { $push: { like_recipe_ids: recipeId } },
        { upsert: true }
      );

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
    } finally {
      session.endSession();
    }
  }

  static async unlike(userId: IUser["_id"], recipeId: IRecipe["_id"]) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      await Recipe.findByIdAndUpdate(recipeId, {
        $pull: { like_members: userId },
      });

      await Like.findOneAndUpdate(
        { user_id: userId },
        { $pull: { like_recipe_ids: recipeId } }
      );
      session.commitTransaction();
    } catch (error) {
      console.log(error);
      session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
