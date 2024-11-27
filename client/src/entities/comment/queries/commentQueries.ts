import { infiniteQueryOptions } from "@tanstack/react-query";
import { CommentService } from "shared/api/comment/service";
import { IRecipe } from "shared/api/recipe";

export class CommentQueries {
  static keys = {
    comment: "comment",
  };

  static staleTime = 24 * 60 * 1000

  static infiniteQuery(recipeId: IRecipe["_id"]) {
    return infiniteQueryOptions({
      queryKey: [this.keys.comment, recipeId],
      queryFn: ({ pageParam, signal }) =>
        CommentService.readCommentsQuery({
          params: {
            recipe_id: recipeId,
            last_comment_id: pageParam,
          },
          signal,
        }),
      initialPageParam: "",
      getNextPageParam: (lastPage) => {
        if (lastPage.length === 0) return;
        
        const lastComment = lastPage.at(-1);
        return lastComment?._id;
      },
      staleTime: this.staleTime
    });
  }
}
