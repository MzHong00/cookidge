export interface IIngredient {
  _id: string;
  name: string;
  category: string;
  quantity: string;
  expired_at: string;
}

export interface IIngredientInputDto extends Omit<IIngredient, "_id"> {}
