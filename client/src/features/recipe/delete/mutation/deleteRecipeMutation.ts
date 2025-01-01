import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAlertActions } from "shared/ui/alert";
import { IRecipe, RecipeService } from "shared/api/recipe";
import { RecipeQueries } from "entities/recipe";

export const useDeleteRecipeMutation = (recipeId: IRecipe["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => RecipeService.deleteRecipe(recipeId),
    onSuccess: async (data) => {
      const { root } = RecipeQueries.keys;

      queryClient.removeQueries({queryKey: [root]})

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
