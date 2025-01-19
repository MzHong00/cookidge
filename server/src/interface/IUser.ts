import mongoose, { ObjectId } from "mongoose";

import { PagenationOptions } from "./types";

export interface IUser {
  _id: ObjectId | mongoose.mongo.BSON.ObjectId;
  name: string;
  email: string;
  picture: string;
  introduce: string;
  follower: IUser["_id"][];
  following: IUser["_id"][];
  plan: "normal" | "premium";
  created_at: Date;
}

export interface IUserSearchQueryOptions extends PagenationOptions {
  user_name?: IUser["name"];
}

export interface IUserCreateInputDTO
  extends Pick<IUser, "name" | "picture" | "email"> {}

export interface IUserUpdateInputDTO extends Pick<IUser, "name" | "introduce"> {
  picture?: string;
}
