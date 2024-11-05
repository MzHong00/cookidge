export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  introduce: string;
  follower: IUser["_id"][];
  following: IUser["_id"][];
  plan: "normal" | "premium";
  created_at: Date;
}

export interface IUserInputDTO {
  name: IUser['name'];
  email: IUser['email'];
  picture: IUser['email'];
}