import type { IUser } from "../user";
import type { IIngredient } from "../ingredient";
import type { PagenationParams } from "shared/types";

export interface IRecipe {
  _id: string;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, "_id" | "expired_at">[];
  introduction: string;
  servings: number | string;
  category: string;
  cooking_time: number | string;
  cooking_steps: ICookingStep[];
  like_members: IUser["_id"][];
  created_at: string;
}
export interface IRecipeCard
  extends Pick<
      IRecipe,
      | "_id"
      | "name"
      | "pictures"
      | "introduction"
      | "servings"
      | "cooking_time"
      | "created_at"
    >,
    Partial<Pick<IRecipe, "like_members">> {}
export interface IRecipeJoinUser extends IRecipe {
  user: IUser;
}
export interface IRecipePictures extends Pick<IRecipe, "_id" | "pictures"> {}

export interface ICookingStep {
  picture?: string;
  instruction: string;
}

export interface ICookingStepInput {
  picture?: FileList | string;
  instruction: string;
}

export interface IRecipeQueryOption extends Partial<PagenationParams> {
  query?: string;
}

export interface RecipeFilterQuery extends Partial<PagenationParams> {
  categories?: IRecipe["category"][];
  sort?: "time" | "like";
}

export interface IRecipeInputDTO
  extends Pick<
    IRecipe,
    | "_id"
    | "name"
    | "ingredients"
    | "introduction"
    | "servings"
    | "category"
    | "cooking_time"
  > {
  pictures: File[] | string[];
  cooking_steps: {
    picture?: File | string;
    instruction: string;
  }[];
}

export interface IRecipeForm extends Omit<IRecipeInputDTO, "cooking_steps"> {
  cooking_steps: ICookingStepInput[];
}
