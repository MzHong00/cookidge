import mongoose, { Schema } from "mongoose";

import { IRecipe } from "../interface/IRecipe";

const CookingStepSchema = new Schema({
  picture: { type: String, required: true },
  instruction: { type: String, required: true },
});

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String, required: true },
});

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: [String], required: true },
  author_id: [{ type: String, required: true }],
  ingredients: [IngredientSchema],
  introduction: { type: String, required: true },
  servings: { type: Number, required: true },
  cooking_time: { type: Number, required: true },
  cooking_steps: [CookingStepSchema],
  like_members: [{ type: String }],
  ratting: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
});

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
