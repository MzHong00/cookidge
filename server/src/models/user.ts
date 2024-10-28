import mongoose, { Schema } from "mongoose";

import { IUser } from "../interface/IUser";

const userSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  introduce:  { type: String},
  follower: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId }],
  plan: { type: String, enum: ["normal", "premium"], default: "normal", required: true },
  created_at: { type: Date, default: Date.now },
});

// userSchema.pre('save', async (next) => {
//  console.log(this);
 
//    // 고유한 이름이 생성될 때까지 반복
//   //  while (true) {
//   //   // 기본 이름 뒤에 무작위 숫자 추가
//   //   const randomSuffix = Math.floor(Math.random() * 10000); // 0에서 9999 사이의 무작위 값

//   //   // 이름 중복 확인
//   //   const existingUser = await mongoose.models.User.findOne({ name: user.name });

//   //   // 중복된 이름이 없다면 루프 탈출
//   //   if (!existingUser) {
//   //     break;
//   //   }
//   // }

//   next();
// })

export const User = mongoose.model<IUser>("User", userSchema);
