import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IFridge } from "shared/api/fridge";
import { IIngredientInputDto, IngredientService } from "shared/api/ingredient";
import { FridgeQueries } from "entities/fridge";

export const useCreateIngredientMutation = (fridgeId?: IFridge["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: (ingredients: IIngredientInputDto[]) =>
      IngredientService.createIngredientMutation(ingredients, fridgeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.detail, fridgeId],
      });
    },
  });
};
