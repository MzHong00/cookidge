import axios from "shared/api/axiosBase";

import { IUser } from "../user";
import {
  IRecipe,
  IRecipeCard,
  IRecipeInputDto,
  RecipeFilterQuery,
} from "./type";

export class RecipeService {
  static readonly root = "api/recipe";

  static async readRecipe(id?: IRecipe["_id"]) {
    return (await axios.get(`${this.root}/read/detail/${id}`)).data;
  }

  static async readRecipeList(config: {
    params: RecipeFilterQuery;
    signal: AbortSignal;
  }): Promise<IRecipeCard[]> {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  static async readMyRecipe(config: {
    signal: AbortSignal;
  }): Promise<IRecipeCard[]> {
    return (await axios.get(`${this.root}/read-list/me`, config)).data;
  }

  static async readRecipeListByUser(userName: IUser["name"]) {
    return (await axios.get(`${this.root}/read/user/${userName}`)).data;
  }

  static async createRecipe(IRecipeInputDto: IRecipeInputDto) {
    return (
      await axios.post(`${this.root}/create`, IRecipeInputDto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  static async updateRecipe(recipe: IRecipe) {
    return (await axios.put(`${this.root}/update`, recipe)).data;
  }

  static async deleteRecipe(recipeId: IRecipe["_id"]) {
    return await axios.delete(`${this.root}/delete`, {
      data: {
        recipeId: recipeId,
      },
    });
  }

  static async likeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/like`, { recipe_id: recipeId });
  }

  static async unlikeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/unlike`, { recipe_id: recipeId });
  }
}
