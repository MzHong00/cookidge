import mongoose from "mongoose";

import type {
  IUser,
  IUserSearchQueryOptions,
  IUserUpdateInputDTO,
} from "../interface/IUser";
import type { PagenationOptions } from "../interface/types";
import { User } from "../models/user";
import { Like } from "../models/like";
import { Comment } from "../models/comment";
import { Refrigerator } from "../models/refrigerator";
import { RecipeService } from "./recipe";
import { CloudinaryService } from "./cloudinary";
import { mongooseTransaction } from "../lib/mongoose/transaction";

export class UserService {
  static readUserById(id: IUser["_id"]) {
    return User.findById(id);
  }

  static readUserByName(name: IUser["name"]) {
    return User.findOne({ name: name });
  }

  static searchUser(searchOptions: IUserSearchQueryOptions) {
    const { user_name, limit = 10, offset } = searchOptions;

    return User.aggregate([
      { $match: { name: { $regex: user_name } } },
      {
        $addFields: {
          follower_count: { $size: "$follower" },
        },
      },
      { $sort: { follower_count: -1 } },
      { $skip: Number(offset) },
      { $limit: Number(limit) },
      {
        $project: {
          name: 1,
          picture: 1,
          introduce: 1,
          follower_count: 1,
        },
      },
    ]);
  }

  static readFollowerList(
    params: PagenationOptions & {
      name: IUser["name"];
    }
  ) {
    const { name, limit = 10, offset = 0 } = params;

    return User.aggregate([
      { $match: { name: name } },
      {
        $lookup: {
          from: "users",
          localField: "follower",
          foreignField: "_id",
          as: "followerDetails",
        },
      },
      { $skip: Number(offset) },
      { $limit: Number(limit) },
      { $unwind: "$followerDetails" },
      { $replaceRoot: { newRoot: "$followerDetails" } },
      {
        $project: {
          _id: 1,
          name: 1,
          picture: 1,
        },
      },
    ]);
  }

  static readFollowingList(
    params: PagenationOptions & {
      name: IUser["name"];
    }
  ) {
    const { name, limit = 10, offset = 0 } = params;

    return User.aggregate([
      { $match: { name: name } },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "followingDetails",
        },
      },
      { $skip: Number(offset) },
      { $limit: Number(limit) },
      { $unwind: "$followingDetails" },
      { $replaceRoot: { newRoot: "$followingDetails" } },
      {
        $project: {
          _id: 1,
          name: 1,
          picture: 1,
        },
      },
    ]);
  }

  static async updateUser(
    userId: IUser["_id"],
    userData: Partial<IUserUpdateInputDTO>
  ) {
    if (userData.picture) {
      const user = await this.readUserById(userId);
      CloudinaryService.deleteFiles([user?.picture || ""]);
    }

    return User.findByIdAndUpdate(userId, { $set: userData }, { new: true });
  }

  static async deleteUser(userId: IUser["_id"]) {
    const myRecipes = await RecipeService.readRecipesByUserId(userId);
    const user = await this.readUserById(userId);

    mongooseTransaction(async () => {
      await Promise.all([
        //레시피들 삭제
        myRecipes.map((recipe) => {
          RecipeService.deleteRecipe(recipe._id);
        }),
        //팔로우 삭제
        User.updateMany(
          {},
          {
            $pull: {
              follower: userId,
            },
          }
        ),
        //냉장고 삭제
        Refrigerator.deleteMany({
          owner_id: userId,
        }),
        //댓글 삭제
        Comment.deleteMany({
          user_id: userId,
        }),
        //좋아요한 레시피삭제
        Like.deleteMany({ user_id: userId }),
        //유저 프로필 이미지 Cloudinary DB에서 삭제
        CloudinaryService.deleteFiles([user?.picture || ""]),
        //유저 삭제
        User.findByIdAndDelete(userId),
      ]);
    });
  }

  static async followUser(userId: IUser["_id"], followUserId: string) {
    const followUserObjectId =
      mongoose.Types.ObjectId.createFromHexString(followUserId);

    mongooseTransaction(async () => {
      await Promise.all([
        User.findByIdAndUpdate(followUserObjectId, {
          $addToSet: { follower: userId },
        }),
        User.findByIdAndUpdate(userId, {
          $addToSet: { following: followUserObjectId },
        }),
      ]);
    });
  }

  static async unfollowUser(userId: IUser["_id"], unfollowUserId: string) {
    const unfollowUserObjectId =
      mongoose.Types.ObjectId.createFromHexString(unfollowUserId);
    mongooseTransaction(async () => {
      await Promise.all([
        User.findByIdAndUpdate(unfollowUserObjectId, {
          $pull: { follower: userId },
        }),
        User.findByIdAndUpdate(userId, {
          $pull: { following: unfollowUserObjectId },
        }),
      ]);
    });
  }
}
