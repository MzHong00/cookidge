import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeQueries } from "entities/fridge";
import { FridgeService } from "shared/api/fridge";

export const useCreateFridgeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [FridgeQueries.keys.list, 'create'],
    mutationFn: (fridgeName: string) =>
      FridgeService.createFridge(fridgeName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.list],
      });
    },
  });
};
