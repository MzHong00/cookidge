import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { RecipeService } from "shared/api/recipe/service";
import { IRecipe, RecipeFilterQuery } from "shared/api/recipe";
import { IRecipeDetailDTO } from "shared/api/recipe/type";

export class RecipeQueries {
  static readonly keys = {
    root: "recipe",
    list: "list",
    user: "user",
    like: "like",
    infinite: "infinite",
  };

  static readonly staleTime = 60 * 60 * 1000;

  // 유저 레시피 목록 조회
  static listByUserQuery(userName?: IUser["name"]) {
    return queryOptions<IRecipe[]>({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: () => RecipeService.readRecipeListByUser(userName),
      staleTime: this.staleTime,
      enabled: !!userName,
      retry: false
    });
  }

  // 레시피 상세 조회
  static detailQuery(recipeId?: IRecipe["_id"]) {
    return queryOptions<IRecipeDetailDTO>({
      queryKey: [this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      staleTime: this.staleTime,
      enabled: !!recipeId,
    });
  }

  // 내가 만든 레시피 목록 조회
  static myListQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: ({ signal }) => RecipeService.readMyRecipe({ signal: signal }),
      staleTime: this.staleTime,
      enabled: !!userName,
    });
  }

  // 내가 좋아요 누른 레시피 목록 조회
  static myLikeQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.like, userName],
      queryFn: ({ signal }) => RecipeService.readMyLikeRecieps({ signal }),
      staleTime: this.staleTime,
      enabled: !!userName,
    });
  }

  // 레시피 조회 무한 스크롤
  static infinityQuery(filter?: RecipeFilterQuery) {
    const { limit = 3, categories, sort } = filter || {};

    return infiniteQueryOptions({
      queryKey: [
        this.keys.root,
        this.keys.list,
        this.keys.infinite,
        categories,
        sort,
      ],
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
    });
  }
}
