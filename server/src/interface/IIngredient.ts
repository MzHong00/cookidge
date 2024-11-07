import Joi from "joi";

export interface IIngredient {
  _id: string;
  name: string;
  category: string;
  quantity: string;
  expired_at: Date;
}

export const mutateIngredientsJoiSchema = Joi.object({
  ingrdients: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        category: Joi.string().required(),
        quantity: Joi.string().required(),
        expired_at: Joi.date().required(),
      })
    )
    .required(),
  refrigerator_id: Joi.string().required(),
});

export const deleteIngredientsJoiSchema = Joi.object({
  ingrdients: Joi.array().items(Joi.string()).required(),
  refrigerator_id: Joi.string().required(),
});
