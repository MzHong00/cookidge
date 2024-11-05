import { useMutation } from "@tanstack/react-query";

import { FridgeQueries } from "entities/fridge";
import { FridgeService } from "shared/api/fridge";

export const useCreateFridgeMutation = () => {
  return useMutation({
    mutationKey: [FridgeQueries.keys.list],
    mutationFn: (fridgeName: string) =>
      FridgeService.createFridgeMutation(fridgeName),
  });
};
