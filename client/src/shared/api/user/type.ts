import { PagenationParams } from "shared/types";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  introduce: string;
  follower: IUser["_id"][];
  following: IUser["_id"][];
  plan: "normal" | "premium";
  created_at: string;
}

export interface IUserInfiniteQueryParams extends PagenationParams {
  user_name: IUser["name"];
}

export interface IUserPicture extends Pick<IUser, "_id" | "picture" | "name"> {}

export interface IUserSearchDTO
  extends IUserPicture {
  introduce: string;
  follower_count: string | number;
}

export interface IUserInputDTO extends Pick<IUser, "name" | "introduce"> {
  picture: File[];
}
