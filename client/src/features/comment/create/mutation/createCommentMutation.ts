import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { IRecipe } from "shared/api/recipe";
import { IComment } from "shared/api/comment";
import { CommentService } from "shared/api/comment/service";
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
