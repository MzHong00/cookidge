import axios from "shared/api/axiosBase";

import { type IUser } from ".";

export class UserService {
  static async fetchMe(): Promise<IUser> {
    const response = await axios.get(`api/user/me`);

    return response.data;
  }

  static async fetchUser(userName: IUser["name"]): Promise<IUser> {
    const response = await axios.get(`api/user/find`, {
      params: { target: userName },
    });

    return response.data;
  }
}
