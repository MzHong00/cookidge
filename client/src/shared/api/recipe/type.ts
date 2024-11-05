import { IUser } from "../user";
import { Ingredient } from "../fridge";
import { CookingStep } from "shared/types";

export interface IRecipe {
  _id: string;
  name: string;
  picture: string[];
  author_id: IUser["_id"][];
  ingredients: Ingredient[];
  introduction: string;
  servings: number;
  cooking_time: number;
  cooking_steps: CookingStep[];
  like_members: IUser["_id"][];
  ratting: number;
  created_at: Date;
}
