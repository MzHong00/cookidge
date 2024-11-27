import { useSearchParams } from "react-router-dom";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IRecipe, RecipeService } from "shared/api/recipe";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useLikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list, like, infinite } = RecipeQueries.keys;
  const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

  const [searSearchParams] = useSearchParams();
  const categoriesParams = searSearchParams.getAll("categories");
  const sortParams = searSearchParams.get("sort");

  const infiniteRecipesQueryKey = [
    root,
    list,
    infinite,
    categoriesParams,
    sortParams,
  ];
  const detailRecipeQueryKey = [root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.likeRecipe(recipeId),
    onMutate: async () => {
      Promise.all([
        queryClient.cancelQueries({ queryKey: infiniteRecipesQueryKey }),
        queryClient.cancelQueries({ queryKey: detailRecipeQueryKey }),
      ]);

      const prevInfiniteRecipes = queryClient.getQueryData(
        infiniteRecipesQueryKey
      ) as InfiniteData<IRecipe[]>;
      const prevDetailRecipe = queryClient.getQueryData(
        detailRecipeQueryKey
      ) as IRecipe;

      // 무한 스크롤 레시피 목록에 좋아요만 반영
      queryClient.setQueryData(
        infiniteRecipesQueryKey,
        (data: InfiniteData<IRecipe[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((recipe) =>
              recipe._id === recipeId
                ? {
                    ...recipe,
                    like_members: [...recipe.like_members, me._id],
                  }
                : recipe
            )
          ),
        })
      );

      if(prevDetailRecipe){
        queryClient.setQueryData(detailRecipeQueryKey, (recipe: IRecipe) => ({
          ...recipe,
          like_members: [...recipe.like_members, me._id],
        }));
      }
      
      return { prevInfiniteRecipes, prevDetailRecipe };
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: [root, list, like, me.name],
        }),
        // 레시피 detail page에 좋아요 반영
        queryClient.invalidateQueries({ queryKey: detailRecipeQueryKey }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(
          infiniteRecipesQueryKey,
          context?.prevInfiniteRecipes
        ),
        queryClient.setQueryData(
          detailRecipeQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};

export const useUnlikeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { root, list, like, infinite } = RecipeQueries.keys;
  const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

  const [searSearchParams] = useSearchParams();
  const categoriesParams = searSearchParams.getAll("categories");
  const sortParams = searSearchParams.get("sort");

  const infiniteRecipesQueryKey = [
    root,
    list,
    infinite,
    categoriesParams,
    sortParams,
  ];
  const detailRecipeQueryKey = [root, recipeId];

  return useMutation({
    mutationFn: () => RecipeService.unlikeRecipe(recipeId),
    onMutate: async () => {
      Promise.all([
        queryClient.cancelQueries({ queryKey: infiniteRecipesQueryKey }),
        queryClient.cancelQueries({ queryKey: detailRecipeQueryKey }),
      ]);

      const prevInfiniteRecipes = queryClient.getQueryData(
        infiniteRecipesQueryKey
      ) as InfiniteData<IRecipe[]>;
      const prevDetailRecipe = queryClient.getQueryData(
        detailRecipeQueryKey
      ) as IRecipe;

      // 무한 스크롤 레시피 목록에 좋아요만 반영
      queryClient.setQueryData(
        infiniteRecipesQueryKey,
        (data: InfiniteData<IRecipe[]>) => ({
          ...data,
          pages: data.pages.map((page) =>
            page.map((recipe) =>
              recipe._id === recipeId
                ? {
                    ...recipe,
                    like_members: recipe.like_members.filter(
                      (member) => member !== me._id
                    ),
                  }
                : recipe
            )
          ),
        })
      );

      if(prevDetailRecipe){
        queryClient.setQueryData(detailRecipeQueryKey, (recipe: IRecipe) => ({
          ...recipe,
          like_members: recipe.like_members.filter((member) => member !== me._id),
        }));
      }

      return { prevInfiniteRecipes, prevDetailRecipe };
    },
    onSettled: async () => {
      await Promise.all([
        // 나의 좋아요 리스트 refetch
        queryClient.invalidateQueries({
          queryKey: [root, list, like, me.name],
        }),
        // 레시피 detail page에 좋아요 반영
        queryClient.invalidateQueries({ queryKey: detailRecipeQueryKey }),
      ]);
    },
    onError: async (err, variables, context) => {
      await Promise.all([
        queryClient.setQueryData(
          infiniteRecipesQueryKey,
          context?.prevInfiniteRecipes
        ),
        queryClient.setQueryData(
          detailRecipeQueryKey,
          context?.prevDetailRecipe
        ),
      ]);
    },
  });
};
