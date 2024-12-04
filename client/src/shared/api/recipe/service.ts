import axios from "shared/api/axiosBase";

import { IUser } from "../user";
import {
  IRecipe,
  IRecipeCard,
  IDetailRecipeResponseDTO,
  IRecipeInputDTO,
  RecipeFilterQuery,
  IRecipePictureDTO,
  ISearchRecipeResponseDTO,
  IRecipeQueryOption,
  IRecipeRecommendRequestDTO,
  IRecipeRecommendResponseDTO,
} from "./type";

export class RecipeService {
  static readonly root = "api/recipe";

  static async readRecipe(id?: IRecipe["_id"]): Promise<IDetailRecipeResponseDTO> {
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
  }): Promise<IRecipePictureDTO[]> {
    return (await axios.get(`${this.root}/read-list/me`, config)).data;
  }

  static async readRecipeListByUser(
    userName: IUser["name"]
  ): Promise<IRecipePictureDTO[]> {
    return (await axios.get(`${this.root}/read/user/${userName}`)).data;
  }

  static async createRecipe(IRecipeInputDTO: IRecipeInputDTO) {
    return (
      await axios.post(`${this.root}/create`, IRecipeInputDTO, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }

  static async updateRecipe(recipeId: IRecipe["_id"], recipe: FormData) {
    return (
      await axios.put(`${this.root}/update`, recipe, {
        params: { _id: recipeId },
      })
    ).data;
  }

  static async deleteRecipe(recipeId: IRecipe["_id"]) {
    return await axios.delete(`${this.root}/delete`, {
      params: {
        _id: recipeId,
      },
    });
  }

  static async searchRecipe(config: {
    signal: AbortSignal;
    params: IRecipeQueryOption
  }): Promise<ISearchRecipeResponseDTO[]> {
    return (await axios.get(`${this.root}/search`, config)).data;
  }

  static async recommnedRecipe(config: {
    signal: AbortSignal,
    params: IRecipeRecommendRequestDTO
  }): Promise<IRecipeRecommendResponseDTO[]> {
    return (await axios.get(`${this.root}/recommend`, config)).data;
  }

  static async readMyLikeRecieps(config: {
    signal: AbortSignal;
  }): Promise<{ _id: string; liked_recipes: IRecipePictureDTO }[]> {
    return (await axios.get(`${this.root}/read-list/like`, config)).data;
  }

  static async likeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/like`, { recipe_id: recipeId });
  }

  static async unlikeRecipe(recipeId: IRecipe["_id"]) {
    return await axios.patch(`${this.root}/unlike`, { recipe_id: recipeId });
  }
}
