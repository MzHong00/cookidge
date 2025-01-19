import axios from "shared/lib/axios";

import { type IUser } from ".";
import {
  IUserInfiniteQueryParams,
  IUserInputDTO,
  IUserPicture,
  IUserSearchDTO,
} from "./type";
import { PagenationParams } from "shared/types";

export class UserService {
  static readonly root = "/api/user";

  static async fetchMe(): Promise<IUser> {
    const response = await axios.get(`${this.root}/me`, {
      headers: {
        "Cache-Control": "no-cache", // 캐시를 사용하지 않음
      },
    });

    return response.data;
  }

  static async fetchUser(userName?: IUser["name"]): Promise<IUser | undefined> {
    if (!userName) return;

    const response = await axios.get(`${this.root}/find`, {
      params: { user_name: userName },
    });

    return response.data;
  }

  static async searchUser(config: {
    signal: AbortSignal;
    params: IUserInfiniteQueryParams;
  }): Promise<IUserSearchDTO[]> {
    return (await axios.get(`${this.root}/search`, config)).data;
  }

  static async updateUser(
    updateData: IUserInputDTO
  ): Promise<{ message: string }> {
    return (
      await axios.patch(`${this.root}/update`, updateData)
    ).data;
  }

  // 유저 삭제
  static async deleteUser(): Promise<{ message: string }> {
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

  // 팔로우 랭킹
  static async followerRank(option: {
    params: PagenationParams;
    signal: AbortSignal;
  }): Promise<(IUserPicture & { follower_count: number })[]> {
    return (await axios.get(`${this.root}/rank-follower`, option)).data;
  }

  // 레시피 메이커 랭킹
  static async recipeMakerRank(option: {
    params: PagenationParams;
    signal: AbortSignal;
  }): Promise<{ _id: string; recipe_count: number; author: IUserPicture }[]> {
    return (await axios.get(`${this.root}/rank-recipe-maker`, option)).data;
  }
}
