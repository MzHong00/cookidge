import Joi from "joi";
import { IUser } from "./IUser";

export interface IRecipe {
  _id: string;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: {
    name: string;
    category: string;
    quantity: string;
  }[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps: {
    picture: string | undefined;
    instruction: string;
  }[];
  like_members: IUser["_id"][];
  created_at: Date;
}

export interface IRecipeInput
  extends Omit<IRecipe, "_id" | "author_id" | "like_members" | "created_at"> {}

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
    instruction: string;
  }[];
  cooking_step_pictures: (File | undefined)[];
}

export interface IRecipeSearchOption {
  categories?: IRecipe['category'][],
  sort?: '최신순' | '좋아요순'
  limit?: number,
  offset?: number
}

export const recipeInputJoiSchema = {
  name: Joi.string().min(2).max(15),
  pictures: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      category: Joi.string(),
      quantity: Joi.string(),
    })
  ),
  introduction: Joi.string(),
  servings: Joi.string(),
  category: Joi.string(),
  cooking_time: Joi.string(),
  cooking_steps: Joi.array().items(
    Joi.object({
      picture: Joi.string().uri(),
      instruction: Joi.string(),
    })
  ),
};

export const createRecipeJoiSchema = Joi.object(recipeInputJoiSchema).fork(
  Object.keys(recipeInputJoiSchema),
  (schema) => schema.required()
).concat(
  Joi.object({
    pictures: Joi.array().optional() // pictures만 optional로 덮어씌우기
  })
);