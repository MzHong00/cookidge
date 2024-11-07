import { IIngredient } from "../interface/IIngredient";
import { IRefrigerator } from "../interface/IRefrigerator";
import { Refrigerator } from "../models/refrigerator";

export class IngredientService {
  static async createIngredient(
    targetRefrigeratorId: IRefrigerator["_id"],
    ingredients: IIngredient[]
  ) {
    return await Refrigerator.findByIdAndUpdate(
      targetRefrigeratorId,
      { $push: { stored_ingredients: { $each: ingredients } } },
      { new: true }
    );
  }

  static async updateIngredients(
    refrigeratorId: IRefrigerator["_id"],
    ingredients: IIngredient[]
  ) {
    const bulkOps = ingredients.map((ingredient) => ({
      updateOne: {
        filter: {
          _id: refrigeratorId,
        },
        update: {
          $set: {
            "stored_ingredients.$.name": ingredient.name,
            "stored_ingredients.$.category": ingredient.category,
            "stored_ingredients.$.quantity": ingredient.quantity,
            "stored_ingredients.$.expired_at": ingredient.expired_at,
          },
        },
      },
    }));

    return await Refrigerator.bulkWrite(bulkOps);
  }

  static async deleteIngredient(
    refrigeratorId: IRefrigerator["owner_id"],
    ingredientIds: IIngredient["_id"][]
  ) {
    return await Refrigerator.findByIdAndUpdate(refrigeratorId, {
      $pull: { stored_ingredients: { _id: { $in: ingredientIds } } },
    });
  }
}
