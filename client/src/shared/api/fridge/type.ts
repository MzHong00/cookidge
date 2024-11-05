import { IUser } from "../user";

export interface IFridge {
  _id: string;
  name: string;
  owner_id: IUser["_id"];
  stored_ingredients: Ingredient[];
  shared_members: IUser["_id"][];
  last_updated: Date;
}

export interface IFridgeFormInput {
  name: IFridge["name"];
}

export interface IFridgeList {
  _id: IFridge['_id'];
  name: IFridge['name'];
}

export interface Ingredient {
  _id: string;
  name: string;
  category: string;
  quantity: string;
  expired_at?: string;
}
