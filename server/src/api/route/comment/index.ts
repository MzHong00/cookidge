import { Router, Request, Response } from "express";
import { Comment } from "../../../models/comment";
import isAuth from "../../middleware/isAuth";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import { CommentService } from "../../../services/comment";
import { celebrate, Joi, Segments } from "celebrate";
import isMyComment from "../../middleware/isMyComment";

const route = Router();

export default (app: Router) => {
  app.use("/comment", route);

  route.get("/read-list", async (req: Request, res: Response) => {
    const recipeId = req.query.recipe_id as string;
    const lastCommentId = req.query.last_comment_id as string;
    try {
      const comment = await CommentService.readComments(
        recipeId,
        lastCommentId
      );

      if (!comment) {
        return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
      }

      res.status(200).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "댓글 조회에 실패했습니다." });
    }
  });

  route.post(
    "/create",
    celebrate({
      [Segments.BODY]: Joi.object({
        recipe_id: Joi.string().required,
        comment: Joi.string().required,
      }),
    }),
    isAuth,
    attachCurrentUser,
    async (req: Request, res: Response) => {
      const userId = req.user?._id as string;
      const recipeId = req.body.recipe_id as string;
      const newComment = req.body.comment as string;

      try {
        const comment = await CommentService.createComment(
          userId,
          recipeId,
          newComment
        );

        res.status(201).json({
          message: "댓글이 성공적으로 생성되었습니다.",
          comment: comment,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 생성에 실패했습니다." });
      }
    }
  );

  route.put(
    "/update",
    celebrate({
      [Segments.BODY]: Joi.object({
        recipe_id: Joi.string().required,
        comment: Joi.string().required,
      }),
    }),
    isAuth,
    attachCurrentUser,
    isMyComment,
    async (req: Request, res: Response) => {
      const recipeId = req.body.recipe_id as string;
      const willUpdateComment = req.body.comment as string;

      try {
        const comment = await CommentService.updateComment(
          recipeId,
          willUpdateComment
        );

        if (!comment) {
          return res
            .status(404)
            .json({ message: "수정할 댓글을 찾을 수 없습니다." });
        }

        res.status(200).json({
          message: "댓글이 성공적으로 수정되었습니다.",
          comment: comment,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 수정에 실패했습니다." });
      }
    }
  );

  route.delete(
    "/:commentId",
    celebrate({
      [Segments.BODY]: Joi.object({ recipe_id: Joi.string().required }),
    }),
    isAuth,
    attachCurrentUser,
    isMyComment,
    async (req: Request, res: Response) => {
      const recipeId = req.body.recipe_id as string;

      try {
        const comment = await CommentService.deleteComment(recipeId);

        if (!comment) {
          return res
            .status(404)
            .json({ message: "삭제할 댓글을 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
      }
    }
  );
};
