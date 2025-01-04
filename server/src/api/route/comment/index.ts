import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import isAuth from "../../middleware/isAuth";
import { CommentService } from "../../../services/comment";
import {
  deleteCommentAuthorization,
  isMyComment,
} from "../../middleware/commentAuthorization";

const route = Router();

export default (app: Router) => {
  app.use("/comment", route);

  route.get(
    "/read-list",
    celebrate({
      [Segments.QUERY]: Joi.object({
        recipe_id: Joi.string().required(),
        last_comment_id: Joi.string().allow(''),
        limit: Joi.string(),
      }),
    }),
    async (req, res) => {
      const commentQuery = req.query as {
        recipe_id: string;
        last_comment_id?: string;
        limit: string;
      };
      
      try {
        const comment = await CommentService.readComments(commentQuery);

        res.status(200).json(comment);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 조회에 실패했습니다." });
      }
    }
  );

  route.post(
    "/create",
    celebrate({
      [Segments.BODY]: Joi.object({
        recipe_id: Joi.string().required(),
        comment: Joi.string().min(1).max(100).required(),
      }),
    }),
    isAuth,
    async (req, res) => {
      const userId = req.userId;
      const { recipe_id, comment } = req.body;

      try {
        await CommentService.createComment(userId, recipe_id, comment);

        res.status(201).json({ message: "댓글 생성에 성공했습니다." });
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
    async (req, res) => {
      const { comment_id, comment } = req.body;

      try {
        const newComment = await CommentService.updateComment(
          comment_id,
          comment
        );

        res.status(200).json({
          message: "댓글 수정에 성공했습니다.",
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
      [Segments.BODY]: Joi.object({
        comment_id: Joi.string().required(),
        author_id: Joi.string().required(),
      }),
    }),
    isAuth,
    deleteCommentAuthorization,
    async (req, res) => {
      const { comment_id } = req.body;

      try {
        const comment = await CommentService.deleteComment(comment_id);

        if (!comment) {
          return res
            .status(404)
            .json({ message: "삭제할 댓글을 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "댓글 삭제에 성공했습니다." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
      }
    }
  );
};
