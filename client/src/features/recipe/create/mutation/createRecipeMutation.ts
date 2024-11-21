import { useMutation } from "@tanstack/react-query";

import { RecipeService } from "shared/api/recipe/service";
import { IRecipeInputDto } from "shared/api/recipe/type";

export const useCreateRecipeMutation = () => {
  return useMutation({
    mutationFn: (recipeInputDto: IRecipeInputDto) =>
      RecipeService.createRecipe(recipeInputDto),
  });
};
