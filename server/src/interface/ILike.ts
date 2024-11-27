import { ObjectId } from "mongoose";
import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";

export interface ILike{
    _id: ObjectId,
    user_id: IUser['_id'],
    like_recipe_ids: IRecipe['_id'][],
}