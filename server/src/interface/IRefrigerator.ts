import { ObjectId } from "mongoose";
import { IIngredient } from "./IIngredient";
import { IUser } from "./IUser";

export interface IRefrigerator {
  _id: ObjectId;
  name: string;
  owner_id: IUser['_id'];
  stored_ingredients: IIngredient[];
  shared_members: IUser['_id'][];
  last_updated: Date;
  created_at: Date;
}
