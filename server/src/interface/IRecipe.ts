import Joi from "joi";
import mongoose, { ObjectId } from "mongoose";

import { IUser } from "./IUser";
import { PagenationOptions } from "./types";
import { IIngredient } from "./IIngredient";

export type IRecipe = {
  _id: ObjectId | mongoose.mongo.BSON.ObjectId;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, 'expired_at'>[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps: ICookingStep[];
  like_members: IUser["_id"][];
  created_at: Date;
}

export type ICookingStep = {
  picture: string | undefined;
  instruction: string;
}

export type IRecipeInput = Omit<IRecipe, "_id" | "author_id" | "like_members" | "created_at"> 

export interface IRecipeQueryOption extends PagenationOptions {
  query?: string;
}

export interface IRecipeSearchOption extends PagenationOptions {
  categories?: IRecipe["category"][];
  sort?: "최신순" | "좋아요순";
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
  cooking_steps: Joi.array(),
  cooking_step_pictures: Joi.array(),
  cooking_step_instructions: Joi.array().items(Joi.string()),
};

export const RecipeInputJoiSchema = Joi.object(recipeInputJoiSchema)
  .fork(Object.keys(recipeInputJoiSchema), (schema) => schema.required())
  .concat(
    Joi.object({
      pictures: Joi.array().optional(), // pictures만 optional로 덮어씌우기
      cooking_step_pictures: Joi.array().optional(),
    })
  );
