import mongoose, { Schema } from "mongoose";

import type { IComment } from "../interface/IComment";

const CommentSchema = new Schema<IComment>({
  recipe_id: { type: mongoose.Types.ObjectId, required: true },
  user_id: { type: mongoose.Types.ObjectId, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
