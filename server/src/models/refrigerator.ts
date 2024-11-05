import mongoose, { Schema } from "mongoose";

import { IRefrigerator } from "../interface/IRefrigerator";

const StoredIngredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String, required: true },
  expired_at: { type: Date, required: true },
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
