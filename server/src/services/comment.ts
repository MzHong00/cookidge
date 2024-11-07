import { IComment } from "../interface/IComment";
import { IRecipe } from "../interface/IRecipe";
import { IUser } from "../interface/IUser";
import { Comment } from "../models/comment";

export class CommentService {
  static async readComments(
    recipeId: IRecipe["_id"],
    lastCommentId: IComment["_id"]
  ) {
    try {
      return await Comment.find({
        _id: { $lt: lastCommentId },
        recipe_id: recipeId,
      })
        .sort({ _id: -1 })
        .limit(5);
    } catch (error) {
      console.error("댓글 읽기 오류:", error);
      throw new Error("댓글을 불러오는 데 실패했습니다.");
    }
  }

  static async createComment(
    userID: IUser["_id"],
    recipeId: IRecipe["_id"],
    comment: IComment['comment']
  ) {
    try {
      return await Comment.create({
        user_id: userID,
        recipe_id: recipeId,
        comment: comment,
      });
    } catch (error) {
      console.error("댓글 작성 오류:", error);
      throw new Error("댓글 작성에 실패했습니다.");
    }
  }

  static async updateComment(
    commentId: IComment["_id"],
    comment: IComment["comment"]
  ) {
    try {
      return await Comment.findByIdAndUpdate(
        commentId,
        { comment: comment },
        { new: true }
      );
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      throw new Error("댓글 수정에 실패했습니다.");
    }
  }

  static async deleteComment(commentId: string) {
    try {
      return await Comment.findByIdAndDelete(commentId);
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      throw new Error("댓글 삭제에 실패했습니다.");
    }
  }
}
