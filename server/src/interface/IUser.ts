import { ObjectId } from "mongoose";
import { IRecipe } from "./IRecipe";

export interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  picture: string;
  introduce: string;
  follower: IUser["_id"][];
  following: IUser["_id"][];
  like_recipe: IRecipe["_id"][];
  plan: "normal" | "premium";
  created_at: Date;
}

export interface IUserInputDTO {
  name: IUser["name"];
  email: IUser["email"];
  picture: IUser["email"];
}
