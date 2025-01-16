import { Refrigerator } from "../models/refrigerator";
import { IIngredient, IIngredientInputDto } from "../interface/IIngredient";

export class IngredientService {
  static createIngredient(
    targetRefrigeratorId: string,
    ingredients: IIngredientInputDto[]
  ) {
    return Refrigerator.findByIdAndUpdate(
      targetRefrigeratorId,
      {
        $push: { stored_ingredients: { $each: ingredients } },
        last_updated: new Date(),
      },
      { new: true }
    );
  }

  static updateIngredients(refrigeratorId: string, ingredients: IIngredient[]) {
    return Refrigerator.findByIdAndUpdate(refrigeratorId, {
      stored_ingredients: ingredients,
      last_updated: new Date(),
    });
  }
}
