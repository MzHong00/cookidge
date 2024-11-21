import { IUser } from "../user";
import { IIngredient } from "../ingredient";

export interface IFridge {
  _id: string;
  name: string;
  owner_id: IUser["_id"];
  stored_ingredients: IIngredient[];
  shared_members: IUser["_id"][];
  last_updated: string;
}

export interface IFridgeFormInput {
  name: IFridge["name"];
}

export interface IFridgeList {
  _id: IFridge['_id'];
  name: IFridge['name'];
}
