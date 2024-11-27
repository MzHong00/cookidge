import { IIngredient, IIngredientInputDto } from "../interface/IIngredient";
import { Refrigerator } from "../models/refrigerator";

export class IngredientService {
  static async createIngredient(
    targetRefrigeratorId: string,
    ingredients: IIngredientInputDto[]
  ) {
    return await Refrigerator.findByIdAndUpdate(
      targetRefrigeratorId,
      { $push: { stored_ingredients: { $each: ingredients } } },
      { new: true }
    );
  }

  static async updateIngredients(
    refrigeratorId: string,
    ingredients: IIngredient[]
  ) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      stored_ingredients: ingredients,
      last_updated: new Date()
    })
  }
}
