import axios from "shared/lib/axios";
import { IRecipe } from "../recipe";
import { IComment, ICommentJoinUser } from "./type";

export class CommentService {
  static root = "api/comment";

  // 댓글 리스트 읽기
  static async readCommentsQuery(config: {
    params: {
      recipe_id: IRecipe["_id"];
      last_comment_id: IComment["_id"];
    };
    signal: AbortSignal;
  }): Promise<ICommentJoinUser[]> {
    return (await axios.get(`${this.root}/read-list`, config)).data;
  }

  // 댓글 생성
  static async createComment(
    recipeId: IRecipe["_id"],
    comment: IComment["comment"]
  ): Promise<IComment> {
    return (
      await axios.post(`${this.root}/create`, {
        recipe_id: recipeId,
        comment: comment,
      })
    ).data;
  }

  // 댓글 수정
  static async updateComment(
    commentId: IComment["_id"],
    comment: IComment["comment"]
  ) {
    return (
      await axios.patch(`${this.root}/update`, {
        comment_id: commentId,
        comment,
      })
    ).data;
  }

  // 댓글 삭제
  static async deleteComment(
    commentId: IComment["_id"],
    authorId: IRecipe["author_id"]
  ): Promise<IComment> {
    return (
      await axios.delete(`${this.root}/delete`, {
        data: {
          comment_id: commentId,
          author_id: authorId,
        },
      })
    ).data;
  }
}
