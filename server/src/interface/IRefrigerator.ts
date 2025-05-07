import mongoose, { type ObjectId } from "mongoose";

import type { IUser } from "./IUser";
import type { IIngredient } from "./IIngredient";

export interface IRefrigerator {
  _id: ObjectId | mongoose.mongo.BSON.ObjectId;
  name: string;
  owner_id: IUser['_id'];
  shared_members: IUser['_id'][];
  allowed_users?: IUser[];
  stored_ingredients: IIngredient[];
  last_updated: Date;
  created_at: Date;
}
