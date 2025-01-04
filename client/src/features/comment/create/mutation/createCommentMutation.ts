import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { IRecipe } from "shared/api/recipe";
import type { IComment } from "shared/api/comment";
import { CommentService } from "shared/api/comment";
import { CommentQueries } from "entities/comment";

export const useCreateCommentMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: IComment["comment"]) =>
      CommentService.createComment(recipeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CommentQueries.keys.comment, recipeId],
      });
    },
  });
};
