import mongoose, { Schema } from "mongoose";

import { IRefrigerator } from "../interface/IRefrigerator";

const StoredIngredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String, required: true },
  expired_at: { type: Date, required: true },
});

const RefrigeratorSchema = new Schema({
  name: { type: String, required: true },
  owner_id: { type: String, required: true },
  stored_ingredients: [StoredIngredientSchema],
  last_updated: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
});

export const Refrigerator = mongoose.model<IRefrigerator>(
  "Refrigerator",
  RefrigeratorSchema
);
