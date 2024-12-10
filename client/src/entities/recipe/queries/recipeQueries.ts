import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IIngredient } from "shared/api/ingredient";
import { RecipeService } from "shared/api/recipe/service";
import { IRecipe, RecipeFilterQuery } from "shared/api/recipe";
import {
  IRecipePictureDTO,
  IRecipeQueryOption,
} from "shared/api/recipe/type";

export class RecipeQueries {
  static readonly keys = {
    root: "recipe",
    list: "list",
    user: "user",
    like: "like",
    search: "search",
    recommend: "recommend",
    infinite: "infinite",
  };

  static readonly staleTime = {
    root: 60 * 60 * 1000,
    search: 60 * 1000,
  };

  // 유저 레시피 목록 조회
  static listByUserQuery(userName?: IUser["name"]) {
    return queryOptions<IRecipePictureDTO[]>({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: () =>
        RecipeService.readRecipeListByUser(userName as IUser["name"]),
      staleTime: this.staleTime.root,
      enabled: !!userName,
      retry: false,
    });
  }

  // 레시피 상세 조회
  static detailQuery(recipeId?: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      staleTime: this.staleTime.root,
      enabled: !!recipeId,
      retry: false,
    });
  }

  // 내가 만든 레시피 목록 조회
  static myListQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: ({ signal }) => RecipeService.readMyRecipe({ signal }),
      staleTime: this.staleTime.root,
      enabled: !!userName,
    });
  }

  // 내가 좋아요 누른 레시피 목록 조회
  static myLikeQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.like, userName],
      queryFn: ({ signal }) => RecipeService.readMyLikeRecieps({ signal }),
      staleTime: this.staleTime.root,
      enabled: !!userName,
    });
  }

  // 레시피 추천
  static recommendQuery(recommendParams: {
    categories?: IRecipe["category"][];
    my_ingredients?: IIngredient["name"][];
  }) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.recommend],
      queryFn: ({ signal }) =>
        RecipeService.recommnedRecipe({
          signal,
          params: recommendParams,
        }),
      enabled: false,
      retry: false
    });
  }

  // 레시피 검색 무한 스크롤
  static infinitySearchQuery(option: Partial<IRecipeQueryOption>) {
    const { query, limit = "3" } = option || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.root, this.keys.search, query],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.searchRecipe({
          signal,
          params: {
            query: query,
            offset: pageParam * Number(limit),
            limit: limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
        if (lastPage?.length === 0) return;

        return lastPageParam + 1;
      },
      staleTime: this.staleTime.search,
      enabled: !!query,
      retry: false,
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
            offset: pageParam * Number(limit),
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
      staleTime: this.staleTime.root,
      retry: false
    });
  }
}
