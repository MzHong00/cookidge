import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { RecipeService } from "shared/api/recipe/service";
import { IRecipe, RecipeFilterQuery } from "shared/api/recipe";

export class RecipeQueries {
  static readonly keys = {
    root: "recipe",
    userList: "user-recipe",
    infinite: "infinite-recipe",
  };

  static readonly staleTime = 60 * 60 * 1000;

  // 유저 레시피 목록 조회
  static listByUserQuery(userName: IUser["name"]) {
    return queryOptions<IRecipe[]>({
      queryKey: [this.keys.userList, userName],
      queryFn: () => RecipeService.readRecipeListByUser(userName),
      staleTime: this.staleTime,
    });
  }

  // 레시피 상세 조회
  static detailQuery(recipeId?: IRecipe["_id"]) {
    return queryOptions<IRecipe>({
      queryKey: [this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      staleTime: this.staleTime,
      enabled: !!recipeId,
    });
  }

  static myListQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.userList, userName],
      queryFn: ({ signal }) => RecipeService.readMyRecipe({ signal: signal }),
      enabled: !!userName
    });
  }

  // 레시피 조회 무한 스크롤
  static infinityQuery(filter?: RecipeFilterQuery) {
    const { limit = 3, categories, sort } = filter || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.root, this.keys.infinite, categories, sort],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.readRecipeList({
          params: {
            limit,
            offset: pageParam * limit,
            categories,
            sort,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        if (lastPage.length === 0) return;

        return lastPageParam + 1;
      },
      staleTime: this.staleTime,
    });
  }
}
