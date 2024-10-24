import mongoose, { Schema } from "mongoose";

import { IUser } from "../interface/IUser";

const userSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: true },
  follower: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId }],
  plan: { type: String, enum: ["normal", "premium"], default: "normal", required: true },
  created_at: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", userSchema);
