import type { IUser, IUserPicture } from "../user";
import type { IIngredient } from "../ingredient";

export interface IFridge {
  _id: string;
  name: string;
  owner_id: IUser["_id"];
  shared_members: IUser["_id"][];
  allowed_users?: IUserPicture[];
  stored_ingredients: IIngredient[];
  last_updated: string;
}

export interface IFridgeFormInput
  extends Pick<IFridge, "name" | "shared_members"> {}

export interface IFridgeList extends Pick<IFridge, "_id" | "name"> {}
