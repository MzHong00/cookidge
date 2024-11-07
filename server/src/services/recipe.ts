import { IRecipe, IRecipeInputDto } from "../interface/IRecipe";
import { IUser } from "../interface/IUser";
import { Recipe } from "../models/recipe";

export class RecipeService {
  static async readRecipe(recipeId: IRecipe["_id"]) {
    return await Recipe.findOne({ _id: recipeId });
  }

  static async readUserRecipes(userName: IUser["name"]) {
    return await Recipe.find({ author_id: userName });
  }

  static async createRecipe(userId: IUser["name"], recipe: IRecipeInputDto) {
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
}
