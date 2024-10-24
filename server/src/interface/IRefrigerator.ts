import { IUser } from "./IUser";

export interface IRefrigerator {
    _id: string;
    name: string;
    owner_id: IUser["_id"];
    stored_ingredients: {
      name: string;
      category: string;
      quantity: string;
      expired_at: Date;
    }[];
    last_updated: Date;
    created_at: Date;
  }