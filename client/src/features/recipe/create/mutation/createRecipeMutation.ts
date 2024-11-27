import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { RecipeService } from "shared/api/recipe/service";
import { IRecipeInputDto } from "shared/api/recipe/type";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe";

export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipeInputDto: IRecipeInputDto) =>
      RecipeService.createRecipe(recipeInputDto),
    onSuccess: () => {
      const { root, list, user } = RecipeQueries.keys;

      const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;
      queryClient.invalidateQueries({
        queryKey: [root, list, user, me.name],
      });
    },
  });
};
