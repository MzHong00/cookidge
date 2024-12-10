import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FridgeService } from "shared/api/fridge";
import { useAlertActions } from "shared/ui/alert";
import { FridgeQueries } from "entities/fridge";

export const useCreateFridgeMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationKey: [FridgeQueries.keys.list, "create"],
    mutationFn: (fridgeName: string) => FridgeService.createFridge(fridgeName),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.list],
      });

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
  });
};
