import { IUser } from "../user";
import { IIngredient } from "../ingredient";
import { PagenationParams } from "shared/types";

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
  extends Omit<IRecipe, "ingredients" | "cooking_steps" | "category"> {}

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
  pictures: FileList | string[];
  cooking_steps: {
    picture?: File[];
    instruction: string;
  }[];
  cooking_step_pictures: (File | undefined)[];
}

export interface IRecipePictureDTO {
  _id: IRecipe["_id"];
  pictures: IRecipe["pictures"];
}

export interface ISearchRecipeResponseDTO
  extends Omit<
    IDetailRecipeResponseDTO,
    "like_members" | "ingredients" | "cooking_steps"
  > {
  like_count: number | string;
}

export interface IRecipeRecommendRequestDTO {
  categories?: IRecipe["category"][];
  my_ingredients?: IIngredient["name"][];
}

export interface IRecipeRecommendResponseDTO
  extends Pick<IRecipe, "_id" | "name" | "pictures" | "like_members"> {
  matched_ingredients:IIngredient["name"][];
}

export interface IDetailRecipeResponseDTO extends IRecipe {
  user: IUser;
}

export interface ICookingStep {
  picture?: string;
  instruction: string;
}

export interface IRecipeQueryOption extends PagenationParams {
  query?: string;
}

export interface RecipeFilterQuery extends PagenationParams {
  categories?: IRecipe["category"][];
  sort?: "time" | "like";
}
