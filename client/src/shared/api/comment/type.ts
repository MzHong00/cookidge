import { IUser } from "../user";
import { IRecipe } from "../recipe";

export interface IComment {
  recipe_id: IRecipe["_id"];
  user_id: IUser["_id"];
  comment: string;
  created_at: Date;
}
