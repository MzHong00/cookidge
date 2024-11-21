import { ObjectId } from "mongoose";
import { IIngredient } from "./IIngredient";

export interface IRefrigerator {
  _id: ObjectId;
  name: string;
  owner_id: string;
  stored_ingredients: IIngredient[];
  shared_members: string[];
  last_updated: Date;
  created_at: Date;
}
