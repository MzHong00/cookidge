import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CommentQueries } from "entities/comment";

import { IComment } from "shared/api/comment";
import { CommentService } from "shared/api/comment/service";
import { IRecipe } from "shared/api/recipe";

export const useDeleteCommentMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: IComment["_id"]) => CommentService.deleteComment(id),
    onSuccess: (deletedComment) => {
      queryClient.setQueryData(
        [CommentQueries.keys.comment, recipeId],
        (data: InfiniteData<IComment[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.filter((comment) => comment._id !== deletedComment._id)
          ),
        })
      );
    },
  });
};
