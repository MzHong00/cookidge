import mongoose, { Schema } from "mongoose";

import type { IUser } from "../interface/IUser";

const userSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  introduce: { type: String },
  follower: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId }],
  plan: {
    type: String,
    enum: ["normal", "premium"],
    default: "normal",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function(next) {
  try {
    const user = this;
    
    while (true) {
      // 기본 이름 뒤에 무작위 숫자 추가
      const randomSuffix = Math.floor(Math.random() * 10000); // 0에서 9999 사이의 무작위 값
      const userAttachRandomNumber = `${user.name}@${randomSuffix}`;

      // 이름 중복 확인
      const existingUser = await mongoose.models.User.findOne({
        name: userAttachRandomNumber,
      });

      // 중복된 이름이 없다면 루프 탈출
      if (!existingUser) {
        user.name = userAttachRandomNumber;
        break;
      }
    }

    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
