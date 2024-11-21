import axios from "shared/api/axiosBase";

import { type IUser } from ".";

export class UserService {
  static readonly root = 'api/user'

  static async fetchMe(): Promise<IUser> {
    const response = await axios.get(`${this.root}/me`);

    return response.data;
  }

  static async fetchUser(userName: IUser["name"]): Promise<IUser> {
    const response = await axios.get(`${this.root}/find`, {
      params: { target: userName },
    });

    return response.data;
  }
}
