import { IIngredient } from "../interface/IIngredient";
import { IRefrigerator } from "../interface/IRefrigerator";
import { IUser } from "../interface/IUser";
import { Refrigerator } from "../models/refrigerator";

export class IngredientService {
  static async createIngredient(
    userId: IUser["_id"],
    targetRefrigeratorId: IRefrigerator["_id"],
    ingredients: IIngredient[]
  ) {
    return await Refrigerator.updateOne(
      {
        _id: targetRefrigeratorId,
        $or: [{ owner_id: userId }, { shared_members: userId }],
      },
      { $push: { stored_ingredients: { $each: ingredients } } }
    );
  }

  static async updateIngredients(
    userId: IUser["_id"],
    refrigeratorId: IRefrigerator["_id"],
    ingredients: IIngredient[]
  ) {
    const bulkOps = ingredients.map((ingredient) => {
      return {
        updateOne: {
          filter: {
            _id: refrigeratorId,
            $or: [{ owner_id: userId }, { shared_members: userId }],
            "stored_ingredients._id": ingredient._id,
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
      };
    });

    return await Refrigerator.bulkWrite(bulkOps);
  }

  static async deleteIngredient(
    userId: IUser["_id"],
    refrigeratorId: IRefrigerator["owner_id"],
    ingredientIds: IIngredient["_id"][]
  ) {
    return await Refrigerator.updateOne(
      { _id: refrigeratorId, owner_id: userId },
      { $pull: { stored_ingredients: { _id: { $in: ingredientIds } } } }
    );
  }
}
