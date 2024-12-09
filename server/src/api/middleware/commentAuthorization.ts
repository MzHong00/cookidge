import { Request, Response, NextFunction } from "express";

import { Comment } from "../../models/comment";

export const isMyComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const { comment_id } = req.body;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const isMyComment = await Comment.findOne({
    _id: comment_id,
    user_id: userId,
  });

  if (!isMyComment)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};

export const deleteCommentAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  const { comment_id, author_id } = req.body;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const isMyComment = await Comment.findOne({
    _id: comment_id,
    user_id: userId,
  });

  const isMyRecipe = userId.toString() === author_id;

  if (!isMyComment && !isMyRecipe)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
