import { useMutation } from "@tanstack/react-query";

import { IRecipe } from "shared/api/recipe";
import { IComment } from "shared/api/comment";
import { CommentService } from "shared/api/comment/service";

export const useCreateCommentMutation = (recipeId: IRecipe["_id"]) => {
  return useMutation({
    mutationFn: (comment: IComment["comment"]) =>
      CommentService.createComment(recipeId, comment),
  });
};
