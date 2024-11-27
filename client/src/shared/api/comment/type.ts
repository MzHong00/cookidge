import { IUser } from "../user";
import { IRecipe } from "../recipe";

export interface IComment {
  _id?: string;
  recipe_id: IRecipe["_id"];
  user_id: IUser["_id"];
  comment: string;
  created_at: Date;
}

export interface ICommentDTO extends IComment {
  user: Pick<IUser, "_id"|"name"|"picture">[]
}