import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { IRecipe, IRecipeInputDTO, RecipeService } from "shared/api/recipe";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";
import { useAlertActions } from "shared/ui/alert";

export const useUpdateRecipeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (recipeInputDto: IRecipeInputDTO) =>
      RecipeService.updateRecipe(recipeId, recipeInputDto),
    onSuccess: async (data) => {
      const { root, list, user } = RecipeQueries.keys;
      const userQueryData = queryClient.getQueryData([
        UserQueries.keys.me,
      ]) as IUser;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [root, recipeId] }),
        queryClient.invalidateQueries({
          queryKey: [root, list, user, userQueryData],
        }),
      ]);

      alertEnqueue({
        message: data.message,
        type: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
