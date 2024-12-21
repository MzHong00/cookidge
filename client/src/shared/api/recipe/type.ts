import { IUser } from "../user";
import { IIngredient } from "../ingredient";
import { PagenationParams } from "shared/types";

export type IRecipe = {
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
};
export type IRecipeCard = Pick<
  IRecipe,
  | "_id"
  | "name"
  | "pictures"
  | "introduction"
  | "servings"
  | "cooking_time"
  | "created_at"
> &
  Partial<Pick<IRecipe, "like_members">>;
export type IRecipeJoinUser = IRecipe & { user: IUser };
export type IRecipePictureDTO = Pick<IRecipe, "_id" | "pictures">;

export type ICookingStep = {
  picture?: string;
  instruction: string;
};

export type ICookingStepInput = {
  picture: FileList | string;
  instruction: string;
};

export type IRecipeQueryOption = PagenationParams & {
  query?: string;
};

export type RecipeFilterQuery = PagenationParams & {
  categories?: IRecipe["category"][];
  sort?: "time" | "like";
};

export type IRecipeInputDTO = Pick<
  IRecipe,
  | "_id"
  | "name"
  | "ingredients"
  | "introduction"
  | "servings"
  | "category"
  | "cooking_time"
> & {
  pictures: FileList | string[];
  cooking_steps: {
    picture: File | string;
    instruction: string;
  }[];
};

export type IRecipeForm = Omit<IRecipeInputDTO, "cooking_steps"> & {
  cooking_steps: ICookingStepInput[];
};
