import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser } from "shared/api/user";
import type { IRecipeInputDTO } from "shared/api/recipe/type";
import { useAlertActions } from "shared/ui/alert";
import { RecipeService } from "shared/api/recipe";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (recipeInputDto: IRecipeInputDTO) =>
      RecipeService.createRecipe(recipeInputDto),
    onSuccess: async (data) => {
      const { root, list, user } = RecipeQueries.keys;
      const me = queryClient.getQueryData([UserQueries.keys.me]) as
        | IUser
        | undefined;

      await queryClient.invalidateQueries({
        queryKey: [root, list, user, me?.name],
      });

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
