import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IRecipe, RecipeService } from "shared/api/recipe";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useDeleteRecipeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => RecipeService.deleteRecipe(recipeId),
    onSuccess: async () => {
      const { root, list, user, like } = RecipeQueries.keys;
      const userQueryData = queryClient.getQueryData([
        UserQueries.keys.me,
      ]) as IUser;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [root, list, user, userQueryData.name],
        }),
        queryClient.invalidateQueries({
          queryKey: [root, list, like, userQueryData.name],
        }),
        queryClient.cancelQueries({ queryKey: [root, recipeId] }),
      ]);
    },
  });
};
