import mongoose from "mongoose";
import {
  IRecipe,
  IRecipeInput,
  IRecipeSearchOption,
} from "../interface/IRecipe";
import { Recipe } from "../models/recipe";

export class RecipeService {
  static async readRecipe(recipeId: string) {
    return await Recipe.findById(recipeId);
  }

  static async readRecipes(option: IRecipeSearchOption) {
    const { categories, sort, limit = 5, offset } = option || {};

    return await Recipe.find(
      {
        $and: [
          ...(categories?.map((category) => ({
            category: category,
          })) || []),
        ],
      },
      {
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
      {
        sort: sort && { [`${sort}`]: -1 },
        limit: Number(limit),
        skip: offset && Number(offset),
      }
    );
  }

  static async readRecipesByUserId(userId: string) {
    return await Recipe.find(
      { author_id: mongoose.Types.ObjectId.createFromHexString(userId) },
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

  static async createRecipe(userId: string, recipe: IRecipeInput) {
    return await Recipe.create({
      ...recipe,
      author_id: userId,
    });
  }

  static async updateRecipe(recipe: IRecipe) {
    return await Recipe.findByIdAndUpdate(recipe._id, recipe, { new: true });
  }

  static async deleteRecipe(recipeId: string) {
    return await Recipe.findByIdAndDelete(recipeId);
  }

  static async like(userId: string, recipeId: string) {
    return await Recipe.findByIdAndUpdate(recipeId, {
      $push: { like_members: userId },
    });
  }

  static async unlike(userId: string, recipeId: string) {
    return await Recipe.findByIdAndUpdate(recipeId, {
      $pull: { like_members: userId },
    });
  }
}
