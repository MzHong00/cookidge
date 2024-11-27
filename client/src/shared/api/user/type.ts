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
