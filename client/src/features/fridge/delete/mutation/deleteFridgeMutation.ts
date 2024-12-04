import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeQueries } from "entities/fridge";
import { FridgeService, IFridge } from "shared/api/fridge";

export const useDeleteFridgeMutation = (id: IFridge["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => FridgeService.deleteFridge(id),
    onSuccess: () => {
      const { detail, list } = FridgeQueries.keys;
      queryClient.invalidateQueries({ queryKey: [list] });
      queryClient.removeQueries({ queryKey: [detail, id] });
    },
  });
};
