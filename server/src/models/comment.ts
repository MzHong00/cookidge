import mongoose, { Schema } from "mongoose";

import { IComment } from "../interface/IComment";

const CommentSchema = new Schema<IComment>({
  recipe_id: { type: String, required: true },
  user_id: { type: String, required: true },
  comment: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>("Comment", CommentSchema);
