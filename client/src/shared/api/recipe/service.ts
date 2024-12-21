import axios from "shared/lib/axios";

import { IUser } from "../user";
import {
  IRecipe,
  IRecipeCard,
  IRecipeJoinUser,
  IRecipeInputDTO,
  RecipeFilterQuery,
  IRecipePictures,
  IRecipeQueryOption,
} from "./type";
import { IIngredient } from "../ingredient";

export class RecipeService {
  static readonly root = "api/recipe";

  static async readRecipe(id?: IRecipe["_id"]): Promise<IRecipeJoinUser> {
    return (await axios.get(`${this.root}/read/detail/${id}`)).data[0];
  }

  static async readRecipeList(config: {
    params: RecipeFilterQuery;
    signal: AbortSignal;
  }): Promise<IRecipeCard[]> {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  static async readMyRecipe(config: {
    signal: AbortSignal;
  }): Promise<IRecipePictures[]> {
    return (await axios.get(`${this.root}/read-list/me`, config)).data;
  }

  static async readRecipeListByUser(
    userName: IUser["name"]
  ): Promise<IRecipePictures[]> {
    return (await axios.get(`${this.root}/read/user/${userName}`)).data;
  }

  static async createRecipe(
    IRecipeInputDTO: IRecipeInputDTO
  ): Promise<{ message: string }> {
    return (
      await axios.post(`${this.root}/create`, IRecipeInputDTO, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  static async updateRecipe(
    recipeId: IRecipe["_id"],
    recipe: IRecipeInputDTO
  ): Promise<{ message: string }> {
    return (
      await axios.put(`${this.root}/update`, recipe, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { _id: recipeId },
      })
    ).data;
  }

  static async deleteRecipe(
    recipeId: IRecipe["_id"]
  ): Promise<{ message: string }> {
    return (
      await axios.delete(`${this.root}/delete`, {
        params: {
          _id: recipeId,
        },
      })
    ).data;
  }

  static async searchRecipe(config: {
    signal: AbortSignal;
    params: IRecipeQueryOption;
  }): Promise<IRecipeCard[]> {
    return (await axios.get(`${this.root}/search`, config)).data;
  }

  static async recommnedRecipe(config: {
    signal: AbortSignal;
    params: {
      categories?: IRecipe["category"][];
      my_ingredients?: IIngredient["name"][];
    };
  }): Promise<
    Array<
      IRecipeCard & {
        matched_ingredients: IIngredient["name"][];
      }
    >
  > {
    if (config.params.my_ingredients?.length === 0) return [];

    return (await axios.get(`${this.root}/recommend`, config)).data;
  }

  static async readMyLikeRecieps(config: {
    signal: AbortSignal;
  }): Promise<{ _id: string; liked_recipes: IRecipePictures }[]> {
    return (await axios.get(`${this.root}/read-list/like`, config)).data;
  }

  static async likeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/like`, { recipe_id: recipeId });
  }

  static async unlikeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/unlike`, { recipe_id: recipeId });
  }
}
