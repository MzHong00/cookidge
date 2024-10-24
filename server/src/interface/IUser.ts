export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  plan: "normal" | "premium";
  follower: IUser["_id"][];
  following: IUser["_id"][];
  created_at: Date;
}

export interface IUserInputDTO {
  name: IUser['name'];
  email: IUser['email'];
  picture: IUser['email'];
}