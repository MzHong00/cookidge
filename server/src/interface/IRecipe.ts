import { Joi } from "celebrate";
import mongoose, { ObjectId } from "mongoose";

import { IUser } from "./IUser";
import { PagenationOptions } from "./types";
import { IIngredient } from "./IIngredient";

export interface IRecipe {
  _id: ObjectId | mongoose.mongo.BSON.ObjectId;
  name: string;
  pictures: string[];
  author_id: IUser["_id"];
  ingredients: Omit<IIngredient, "expired_at">[];
  introduction: string;
  servings: number;
  category: string;
  cooking_time: number;
  cooking_steps: ICookingStep[];
  like_members: IUser["_id"][];
  created_at: Date;
}

export interface ICookingStep {
  picture: string;
  instruction: string;
}

export interface IRecipeInput extends Omit<IRecipe, '_id' | 'author_id' | 'like_members' | 'created_at'> {}

export interface IRecipeQueryOption extends PagenationOptions {
  query?: string;
}

export type IRecipeSort = "latest" | "like";

export interface IRecipeSearchOption extends PagenationOptions {
  title?: string;
  categories?: IRecipe["category"][] | IRecipe["category"];
  sort?: IRecipeSort;
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
  servings: Joi.number().required(),
  category: Joi.string().required(),
  cooking_time: Joi.number().required(),
  cooking_steps: Joi.any(),
  __v: Joi.string(),
};
