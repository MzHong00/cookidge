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
    ratting: number;
    created_at: Date;
  }