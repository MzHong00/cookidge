import mongoose from "mongoose";
import { IUser } from "../interface/IUser";
import { User } from "../models/user";

export class UserService {
  static async readUserById(id: string) {
    return await User.findById(id);
  }

  static async readUserByName(name: IUser["name"]) {
    return await User.findOne({ name: name });
  }

  static async updateUser() {}

  static async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  }

  static async followUser(userId: IUser["_id"], followUserId: string) {
    const followUserObjectId =
      mongoose.Types.ObjectId.createFromHexString(followUserId);

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await User.findByIdAndUpdate(followUserObjectId, {
        $addToSet: { follower: userId },
      });

      await User.findByIdAndUpdate(userId, {
        $addToSet: { following: followUserObjectId },
      });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }

  static async unfollowUser(userId: IUser["_id"], unfollowUserId: string) {
    const unfollowUserObjectId =
      mongoose.Types.ObjectId.createFromHexString(unfollowUserId);

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      await User.findByIdAndUpdate(unfollowUserObjectId, {
        $pull: { follower: userId },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { following: unfollowUserObjectId },
      });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
    } finally {
      await session.endSession();
    }
  }
}
