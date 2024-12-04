import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IRecipe, RecipeService } from "shared/api/recipe";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useUpdateRecipeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeInputDto: FormData) =>
      RecipeService.updateRecipe(recipeId, recipeInputDto),
    onSettled: () => {
      const { root, list, user } = RecipeQueries.keys;
      const userQueryData = queryClient.getQueryData([
        UserQueries.keys.me,
      ]) as IUser;

      queryClient.invalidateQueries({ queryKey: [root, recipeId] });
      queryClient.invalidateQueries({
        queryKey: [root, list, user, userQueryData],
      });
    },
  });
};
