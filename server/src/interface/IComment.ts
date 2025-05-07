import type { ObjectId } from "mongoose";

import type { IUser } from "./IUser";
import type { IRecipe } from "./IRecipe";
import type { PagenationOptions } from "./types";

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