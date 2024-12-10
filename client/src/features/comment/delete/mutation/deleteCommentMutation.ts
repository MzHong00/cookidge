import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IRecipe } from "shared/api/recipe";
import { IComment } from "shared/api/comment";
import { useAlertActions } from "shared/ui/alert";
import { CommentService } from "shared/api/comment/service";
import { CommentQueries } from "entities/comment";

export const useDeleteCommentMutation = (
  recipeId: IRecipe["_id"],
  author_id: IRecipe["author_id"]
) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (id: IComment["_id"]) =>
      CommentService.deleteComment(id, author_id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [CommentQueries.keys.comment, recipeId],
      });

      alertEnqueue({
        message: data.message,
        type: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
