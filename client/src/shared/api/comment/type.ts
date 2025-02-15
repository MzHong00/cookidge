import type { IUser } from "../user";
import type { IRecipe } from "../recipe";

export interface IComment {
  _id?: string;
  recipe_id: IRecipe["_id"];
  user_id: IUser["_id"];
  comment: string;
  created_at: Date;
}

export interface ICommentJoinUser extends IComment {
  user: Pick<IUser, "_id"|"name"|"picture">[]
}