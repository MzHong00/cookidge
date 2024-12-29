import { Joi } from "celebrate";
import mongoose, { ObjectId } from "mongoose";

import { IUser } from "./IUser";
import { PagenationOptions } from "./types";
import { IIngredient } from "./IIngredient";

export type IRecipe = {
  _id: ObjectId | mongoose.mongo.BSON.ObjectId;
  name: string;
  pictures?: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, "expired_at">[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps?: ICookingStep[];
  like_members: IUser["_id"][];
  created_at: Date;
};

export type ICookingStep = {
  picture?: string;
  instruction: string;
};

export type IRecipeInput = Pick<
  IRecipe,
  | "name"
  | "introduction"
  | "category"
  | "cooking_time"
  | "servings"
  | "category"
> &
  Partial<Pick<IRecipe, "ingredients" | "pictures" | "cooking_steps">>;

export interface IRecipeQueryOption extends PagenationOptions {
  query?: string;
}

export interface IRecipeSearchOption extends PagenationOptions {
  categories?: IRecipe["category"][];
  sort?: "최신순" | "좋아요순";
}

export const recipeInputJoiSchema = {
  _id: Joi.string(),
  name: Joi.string().min(2).max(15).required(),
  pictures: Joi.any(),
  ingredients: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      category: Joi.string().required(),
      quantity: Joi.string().required(),
    })
  ),
  introduction: Joi.string().required(),
  servings: Joi.string().required(),
  category: Joi.string().required(),
  cooking_time: Joi.string().required(),
  cooking_steps: Joi.any(),
  __v: Joi.string(),
};