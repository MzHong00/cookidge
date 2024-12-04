import mongoose, { Schema } from "mongoose";

import { ILike } from "../interface/ILike";

const LikeSchema = new Schema<ILike>({
  user_id: { type: mongoose.Types.ObjectId,required: true },
  recipe_id: { type: mongoose.Types.ObjectId, required: true },
});

export const Like = mongoose.model<ILike>("Like", LikeSchema);