import mongoose, { Schema } from "mongoose";

import { IRefrigerator } from "../interface/IRefrigerator";

const INGREDIENTS_CATEGORIES_TEXT = [
  "고기",
  "채소",
  "과일",
  "해산물",
  "유제품",
  "견과류",
  "소스",
];

const StoredIngredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: INGREDIENTS_CATEGORIES_TEXT, required: true },
  quantity: { type: String, required: true },
  expired_at: { type: String, required: true },
});

const RefrigeratorSchema = new Schema<IRefrigerator>({
  name: { type: String, required: true },
  owner_id: { type: String, required: true },
  stored_ingredients: [StoredIngredientSchema],
  last_updated: { type: Date, default: Date.now },
  shared_members: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

// 복합키 설정
RefrigeratorSchema.index({ owner_id: 1, name: 1 }, { unique: true });

export const Refrigerator = mongoose.model<IRefrigerator>(
  "Refrigerator",
  RefrigeratorSchema
);
