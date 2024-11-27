import { Request, Response, NextFunction } from "express";

import { Recipe } from "../../models/recipe";

export default (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const recipeId = req.body.recipe_id || req.body.recipe._id;

  if (!userId)
    return res.status(401).json({ message: "로그인 상태가 아닙니다." });

  const isMyRecipe = Recipe.findOne({
    _id: recipeId,
    author_id: userId,
  });

  if (!isMyRecipe)
    return res.status(403).json({ message: "허가되지 않은 사용자입니다." });

  next();
};
