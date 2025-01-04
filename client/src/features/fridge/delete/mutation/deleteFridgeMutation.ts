import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAlertActions } from "shared/ui/alert";
import { FridgeService, type IFridge } from "shared/api/fridge";
import { FridgeQueries } from "entities/fridge";

export const useDeleteFridgeMutation = (id: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => FridgeService.deleteFridge(id),
    onSuccess: async (data) => {
      const { detail, list } = FridgeQueries.keys;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [list] }),
        queryClient.removeQueries({ queryKey: [detail, id] }),
      ]);

      alertEnqueue({
        message: data.message,
        type: "success",
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
    retry: false,
  });
};
