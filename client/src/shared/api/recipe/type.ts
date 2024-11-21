import { IUser } from "../user";
import { IIngredient } from "../ingredient";

export interface IRecipe {
  _id: string;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, "_id" | "expired_at">[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps: CookingStep[];
  like_members: IUser["_id"][];
  created_at: string;
}

export interface IRecipeCard
  extends Omit<IRecipe, "ingredients" | "cooking_steps" | "category"> {}

export interface IRecipeInputDto
  extends Omit<
    IRecipe,
    | "_id"
    | "pictures"
    | "author_id"
    | "cooking_steps"
    | "like_members"
    | "created_at"
  > {
  pictures: FileList;
  cooking_steps: {
    picture: File[] | undefined;
    instruction: CookingStep["instruction"];
  }[];
  cooking_step_pictures: (File | undefined)[];
}

export interface CookingStep {
  picture?: string;
  instruction: string;
}

export interface RecipeFilterQuery {
  categories?: IRecipe["category"][];
  sort?: "time" | "like";
  limit?: number;
  offset?: number;
}
