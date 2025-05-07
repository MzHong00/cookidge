import mongoose, { Schema } from "mongoose";

import type { IRecipe } from "../interface/IRecipe";

const FOOD_CATEGORIES = ["한식", "일식", "중식", "양식", "디저트"];

const CookingStepSchema = new Schema(
  {
    picture: { type: String },
    instruction: { type: String, required: true },
  },
  { _id: false }
);

const IngredientSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { _id: false }
);

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  pictures: { type: [String], required: true },
  author_id: { type: mongoose.Types.ObjectId, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  introduction: { type: String, required: true },
  servings: { type: Number, required: true },
  category: { type: String, enum: FOOD_CATEGORIES, required: true },
  cooking_time: { type: Number, required: true },
  cooking_steps: { type: [CookingStepSchema], required: true },
  like_members: [{ type: mongoose.Types.ObjectId, default: [] }],
  created_at: { type: Date, default: Date.now },
});

export const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);
