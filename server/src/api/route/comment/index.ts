import { Router, Request, Response } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import isAuth from "../../middleware/isAuth";
import isMyComment from "../../middleware/isMyComment";
import { CommentService } from "../../../services/comment";
import mongoose from "mongoose";

const route = Router();

export default (app: Router) => {
  app.use("/comment", route);

  route.get("/read-list", async (req: Request, res: Response) => {
    const { recipe_id, last_comment_id } = req.query;

    const recipeObjectId = mongoose.Types.ObjectId.createFromHexString(
      recipe_id as string
    );
    const lastCommentObjectId = last_comment_id
      ? mongoose.Types.ObjectId.createFromHexString(last_comment_id as string)
      : undefined;

    try {
      const comment = await CommentService.readComments(
        recipeObjectId,
        lastCommentObjectId
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
        recipe_id: Joi.string().required(),
        comment: Joi.string().min(1).max(100).required(),
      }),
    }),
    isAuth,
    async (req: Request, res: Response) => {
      const userId = req.userId;
      const { recipe_id, comment } = req.body;

      try {
        const newComment = await CommentService.createComment(
          userId,
          recipe_id,
          comment
        );

        res.status(201).json(newComment);
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
        comment_id: Joi.string().required(),
        comment: Joi.string().required(),
      }),
    }),
    isAuth,
    isMyComment,
    async (req: Request, res: Response) => {
      const { comment_id, comment } = req.body;

      try {
        const newComment = await CommentService.updateComment(
          comment_id,
          comment
        );

        if (!newComment) {
          return res
            .status(404)
            .json({ message: "수정할 댓글을 찾을 수 없습니다." });
        }

        res.status(200).json({
          message: "댓글이 성공적으로 수정되었습니다.",
          comment: newComment,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 수정에 실패했습니다." });
      }
    }
  );

  route.delete(
    "/delete",
    celebrate({
      [Segments.BODY]: Joi.object({ comment_id: Joi.string().required() }),
    }),
    isAuth,
    isMyComment,
    async (req: Request, res: Response) => {
      const { comment_id } = req.body;

      try {
        const comment = await CommentService.deleteComment(comment_id);

        if (!comment) {
          return res
            .status(404)
            .json({ message: "삭제할 댓글을 찾을 수 없습니다." });
        }

        res.status(200).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
      }
    }
  );
};
