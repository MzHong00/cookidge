import axios from "shared/api/axiosBase";

import { type IUser } from ".";

export class UserService {
  static readonly root = "api/user";

  static async fetchMe(): Promise<IUser> {
    const response = await axios.get(`${this.root}/me`);

    return response.data;
  }

  static async fetchUser(userName?: IUser["name"]): Promise<IUser | undefined> {
    if (!userName) return;

    const response = await axios.get(`${this.root}/find`, {
      params: { user_name: userName },
    });

    return response.data;
  }

  static async updateUser(updateData: IUser) {
    return (
      await axios.patch(`${this.root}/update`, {
        updateData,
      })
    ).data;
  }

  // 유저 삭제
  static async deleteUser() {
    return (await axios.delete(`${this.root}/delete`)).data;
  }

  // 유저 팔로우
  static async followUser(followUserId: IUser["_id"]) {
    return (
      await axios.patch(`${this.root}/follow`, {
        follow_user_id: followUserId,
      })
    ).data;
  }

  // 유저 언팔로우
  static async unfollowUser(unfollowUserId: IUser["_id"]) {
    return (
      await axios.patch(`${this.root}/unfollow`, {
        unfollow_user_id: unfollowUserId,
      })
    ).data;
  }
}
