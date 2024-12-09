import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentQueries } from "entities/comment";

import { IComment } from "shared/api/comment";
import { CommentService } from "shared/api/comment/service";
import { IRecipe } from "shared/api/recipe";

export const useDeleteCommentMutation = (
  recipeId: IRecipe["_id"],
  author_id: IRecipe["author_id"]
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: IComment["_id"]) =>
      CommentService.deleteComment(id, author_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CommentQueries.keys.comment, recipeId],
      });
    },
  });
};
