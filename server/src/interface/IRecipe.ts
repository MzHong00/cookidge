import Joi from "joi";
import { IUser } from "./IUser";

export interface IRecipe {
  _id: string;
  name: string;
  picture: string[];
  author_id: IUser["_id"];
  ingredients: {
    name: string;
    category: string;
    quantity: string;
  }[];
  introduction: string;
  servings: number;
  cooking_time: number;
  cooking_steps: {
    picture: string;
    instruction: string;
  }[];
  like_members: IUser["_id"][];
  created_at: Date;
}

export interface IRecipeInputDto
  extends Omit<IRecipe, "_id" | "author_id" | "like_members" | "created_at"> {}

const recipeInputJoiSchema = {
  name: Joi.string().min(2).max(15),
  picture: Joi.array().items(Joi.string()),
  ingredients: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      category: Joi.string(),
      qunatity: Joi.string(),
    })
  ),
  introduction: Joi.string(),
  servings: Joi.number(),
  cooking_time: Joi.number(),
  cooking_steps: Joi.array().items(
    Joi.object({
      picture: Joi.string(),
      instruction: Joi.string(),
    })
  ),
};

export const createRecipeJoiSchema = Joi.object(recipeInputJoiSchema).fork(
  Object.keys(recipeInputJoiSchema),
  (schema) => schema.required()
);
export const updateRecipeJoiSchema = Joi.object(recipeInputJoiSchema).min(1);
export const deleteRecipeJoiSchema = Joi.object({ recipe_id: Joi.string() });
