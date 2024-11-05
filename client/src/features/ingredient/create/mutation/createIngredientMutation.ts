import { useMutation } from "@tanstack/react-query";
import { FridgeQueries } from "entities/fridge";
import { FridgeService, IFridge } from "shared/api/fridge";

export const createIngredientMutation = (id: string) => {
  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, id],
    mutationFn: (fridge: IFridge) => FridgeService.updateFridgeMutation(fridge),
  });
};
