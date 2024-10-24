import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";

export interface IComment {
    recipe_id: IRecipe["_id"];
    user_id: IUser["_id"];
    comment: string;
    created_at: Date;
  }
  