import { infiniteQueryOptions } from "@tanstack/react-query";

import type { IRecipe } from "shared/api/recipe";
import type { PagenationParams } from "shared/types";
import { CommentService } from "shared/api/comment";

export class CommentQueries {
  static keys = {
    comment: "comment",
  };

  static infiniteQuery(
    query: { recipeId: IRecipe["_id"] } & Partial<PagenationParams>
  ) {
    const { recipeId, limit = 10 } = query;

    return infiniteQueryOptions({
      queryKey: [this.keys.comment, recipeId],
      queryFn: ({ pageParam, signal }) =>
        CommentService.readCommentsQuery({
          params: {
            recipe_id: recipeId,
            last_comment_id: pageParam,
            limit: limit
          },
          signal,
        }),
      initialPageParam: "",
      getNextPageParam: (lastPage) => {
        if (lastPage.length === 0) return;

        const lastComment = lastPage.at(-1);
        return lastComment?._id;
      },
      retry: false
    });
  }
}
