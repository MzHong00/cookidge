import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import type { IUser } from "shared/api/user";
import type { IFridge } from "shared/api/fridge";
import type { IIngredient } from "shared/api/ingredient";
import type { IRecipePictures, IRecipeQueryOption } from "shared/api/recipe";
import {
  type IRecipe,
  type RecipeFilterQuery,
  RecipeService,
} from "shared/api/recipe";

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

  // 유저 레시피 목록 조회
  static listByUserQuery(userName?: IUser["name"]) {
    return queryOptions<IRecipePictures[]>({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: () =>
        RecipeService.readRecipeListByUser(userName as IUser["name"]),
      enabled: !!userName,
      retry: false,
    });
  }

  // 레시피 상세 조회
  static detailQuery(recipeId?: IRecipe["_id"]) {
    return queryOptions({
      queryKey: [this.keys.root, recipeId],
      queryFn: () => RecipeService.readRecipe(recipeId),
      enabled: !!recipeId,
      retry: false,
    });
  }

  // 내가 만든 레시피 목록 조회
  static myListQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.user, userName],
      queryFn: ({ signal }) => RecipeService.readMyRecipe({ signal }),
      enabled: !!userName,
    });
  }

  // 내가 좋아요 누른 레시피 목록 조회
  static myLikeQuery(userName?: IUser["name"]) {
    return queryOptions({
      queryKey: [this.keys.root, this.keys.list, this.keys.like, userName],
      queryFn: ({ signal }) => RecipeService.readMyLikeRecieps({ signal }),
      enabled: !!userName,
    });
  }

  // 레시피 추천
  static recommendQuery(params: {
    fridge_id: IFridge["_id"];
    categories?: IRecipe["category"][];
    my_ingredients?: IIngredient["name"][];
  }) {
    const { fridge_id, categories, my_ingredients } = params;

    return queryOptions({
      queryKey: [
        this.keys.root,
        this.keys.list,
        this.keys.recommend,
        fridge_id,
      ],
      queryFn: ({ signal }) =>
        RecipeService.recommnedRecipe({
          signal,
          params: {
            categories,
            my_ingredients,
          },
        }),
      select: (data) =>
        data?.filter((recipe) => recipe.matched_ingredients.length !== 0),
      enabled: false,
      retry: false,
    });
  }

  // 레시피 검색 무한 스크롤
  static infinitySearchQuery(option: Partial<IRecipeQueryOption>) {
    const { query, limit = 3 } = option || {};

    return infiniteQueryOptions({
      queryKey: [this.keys.root, this.keys.search, query],
      queryFn: ({ pageParam, signal }) =>
        RecipeService.searchRecipe({
          signal,
          params: {
            query: query,
            offset: pageParam * limit,
            limit: limit,
          },
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < limit) return;

        return lastPageParam + 1;
      },
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
            offset: pageParam * limit,
            categories,
            sort,
          },
          signal,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.length === 0 || lastPage?.length < limit) return;

        return lastPageParam + 1;
      },
      retry: false,
    });
  }
}
