import Joi from "joi";
import { ObjectId } from "mongoose";

export interface IIngredient {
  _id: ObjectId;
  name: string;
  category: string;
  quantity: string;
  expired_at: Date;
}

export interface IIngredientInputDto extends Omit<IIngredient, "_id"> {}

export const ingredientsJoiSchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  category: Joi.string().required(),
  quantity: Joi.string().required(),
  expired_at: Joi.string().required(),
});
