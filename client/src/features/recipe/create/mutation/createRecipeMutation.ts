import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { RecipeService } from "shared/api/recipe/service";
import { IRecipeInputDTO } from "shared/api/recipe/type";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeInputDto: IRecipeInputDTO) =>
      RecipeService.createRecipe(recipeInputDto),
    onSuccess: async () => {
      const { root, list, user } = RecipeQueries.keys;

      const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;
      await queryClient.invalidateQueries({
        queryKey: [root, list, user, me.name],
      });
    },
  });
};
