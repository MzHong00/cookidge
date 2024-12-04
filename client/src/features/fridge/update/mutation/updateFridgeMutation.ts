import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeQueries } from "entities/fridge";
import { FridgeService, IFridge } from "shared/api/fridge";

export const useUpdateFridgeMutation = (id?: IFridge["_id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: IFridge["name"]) =>
      FridgeService.updateFridge(id, name),
    onSuccess: () => {
      const { detail, list } = FridgeQueries.keys;
      queryClient.invalidateQueries({ queryKey: [list] });
      queryClient.invalidateQueries({ queryKey: [detail, id] });
    },
  });
};
