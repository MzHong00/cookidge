import mongoose, { Schema } from "mongoose";

import { ILike } from "../interface/ILike";

const LikeSchema = new Schema<ILike>({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  like_recipe_ids: [{ type: mongoose.Types.ObjectId, required: true }],
});

LikeSchema.index({ user_id: 1 }, { unique: true });

export const Like = mongoose.model<ILike>("Like", LikeSchema);
