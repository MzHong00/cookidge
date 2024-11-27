import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";
import { ObjectId } from "mongoose";

export interface IComment {
  _id: ObjectId;
  recipe_id: IRecipe["_id"];
  user_id: IUser["_id"];
  comment: string;
  created_at: Date;
}