import { Request, Response, NextFunction } from "express";

import { Comment } from "../../models/comment";

export default (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  const commentId = req.body.comment_id || req.body.comment._id;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const isMyComment = Comment.findOne({
    _id: commentId,
    user_id: userId,
  });

  if (!isMyComment)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
