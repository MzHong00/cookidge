import axios from "shared/api/axiosBase";

import { IIngredient, IIngredientInputDto } from "./type";
import { IFridge } from "../fridge";

export class IngredientService {
  static readonly root = "api/ingredient";

  static async createIngredientMutation(
    fridgeId: IFridge["_id"],
    ingredients: IIngredientInputDto[]
  ) {
    return (
      await axios.post(
        `${this.root}/create`,
        { ingredients: ingredients },
        {
          params: {
            refrigerator_id: fridgeId,
          },
        }
      )
    ).data;
  }

  static async updateIngredientMutation(
    fridgeId: IFridge["_id"],
    ingredients: IIngredient[]
  ) {
    return (
      await axios.patch(
        `${this.root}/update`,
        { ingredients: ingredients },
        {
          params: {
            refrigerator_id: fridgeId,
          },
        }
      )
    ).data;
  }

  static async deleteIngredientMutation(
    fridgeId: IFridge["_id"],
    ingredients: IIngredient["_id"][]
  ) {
    return await axios.delete(`${this.root}/delete`, {
      data: { ingredients: ingredients },
      params: { refrigerator_id: fridgeId },
    });
  }
}
