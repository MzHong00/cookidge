import { ObjectId } from "mongoose";

import { IUser } from "./IUser";
import { IRecipe } from "./IRecipe";

export interface ILike{
    _id: ObjectId,
    user_id: IUser['_id'],
    recipe_id: IRecipe['_id'],
}