import type { ObjectId } from "mongoose";

import type { IUser } from "./IUser";
import type { IRecipe } from "./IRecipe";

export interface ILike{
    _id: ObjectId,
    user_id: IUser['_id'],
    recipe_id: IRecipe['_id'],
}