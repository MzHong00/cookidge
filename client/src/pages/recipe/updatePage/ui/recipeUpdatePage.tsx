import { useLocation } from "react-router-dom";

import type { IRecipeForm, IRecipeJoinUser } from "shared/api/recipe";
import { UpdateRecipeForm } from "features/recipe/update";

export const RecipeUpdatePage = () => {
  const location = useLocation();

  const { author_id, like_members, created_at, user, ...inputRecipe } =
    location.state as IRecipeJoinUser;

  return <UpdateRecipeForm defalutValues={inputRecipe as IRecipeForm} />;
};
