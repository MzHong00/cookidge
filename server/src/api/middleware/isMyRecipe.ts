import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import { Recipe } from "../../models/recipe";

export default async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const recipeId = req.query._id as string | undefined;

  if (!recipeId)
    return res.status(404).json({ message: "레시피 ID가 없습니다." });

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const isMyRecipe = await Recipe.findOne({
    _id: mongoose.Types.ObjectId.createFromHexString(recipeId),
    author_id: userId,
  });

  if (!isMyRecipe)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
