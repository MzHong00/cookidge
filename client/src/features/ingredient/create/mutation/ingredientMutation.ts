import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeQueries } from "entities/fridge";
import { IFridge } from "shared/api/fridge";
import {
  IIngredient,
  IIngredientInputDto,
  IngredientService,
} from "shared/api/ingredient";

export const useCreateIngredientMutation = (fridgeId: IFridge["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: (ingredients: IIngredientInputDto[]) =>
      IngredientService.createIngredientMutation(fridgeId, ingredients),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.detail, fridgeId],
      });
    },
  });
};

export const useUpdateIngredientMutation = (fridgeId: IFridge["_id"]) => {
  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: async (ingredients: IIngredient[]) =>
      await IngredientService.updateIngredientMutation(fridgeId, ingredients),
  });
};

export const useDeleteIngredientMutation = (fridgeId: IFridge["_id"]) => {
  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: async (ingredients: IIngredient["_id"][]) =>
      await IngredientService.deleteIngredientMutation(fridgeId, ingredients),
  });
};
