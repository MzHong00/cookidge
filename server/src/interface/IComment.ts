import { ObjectId } from "mongoose";

import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";
import { PagenationOptions } from "./types";

export interface IComment {
  _id: ObjectId;
  recipe_id: IRecipe["_id"];
  user_id: IUser["_id"];
  comment: string;
  created_at: Date;
}

export interface ICommentQuery extends PagenationOptions{
  recipe_id: string;
  last_comment_id?: string;
}