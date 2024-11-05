import { IRecipe } from "../recipe";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    picture: string;
    introduce: string;
    like_recipes: IRecipe["_id"][];
    follower: IUser["_id"][];
    following: IUser["_id"][];
    plan: "normal" | "premium";
    created_at: Date;
  }