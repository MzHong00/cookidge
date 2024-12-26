import mongoose from "mongoose";

import {
  IUser,
  IUserSearchQueryOptions,
  IUserUpdateInputDTO,
} from "../interface/IUser";
import { User } from "../models/user";
import { mongooseTransaction } from "../lib/mongoose/transaction";
import { RecipeService } from "./recipe";
import { Refrigerator } from "../models/refrigerator";
import { Comment } from "../models/comment";
import { Like } from "../models/like";
import { CloudinaryService } from "./cloudinary";

export class UserService {
  static async readUserById(id: IUser['_id']) {
    return await User.findById(id);
  }

  static async readUserByName(name: IUser["name"]) {
    return await User.findOne({ name: name });
  }

  static async searchUser(searchOptions: IUserSearchQueryOptions) {
    const { user_name, limit = 10, offset } = searchOptions;

    return await User.aggregate([
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

  static async updateUser(
    userId: IUser["_id"],
    userData: Partial<IUserUpdateInputDTO>
  ) {
    const user = await this.readUserById(userId);
    CloudinaryService.deleteFiles([user?.picture || ""])

    return await User.findByIdAndUpdate(
      userId,
      { $set: userData },
      { new: true }
    );
  }

  static async deleteUser(userId: IUser["_id"]) {
    const myRecipes = await RecipeService.readUserRecipes(userId);
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
