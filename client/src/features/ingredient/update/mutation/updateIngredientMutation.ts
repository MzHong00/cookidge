import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IFridge } from "shared/api/fridge";
import { useAlertActions } from "shared/ui/alert";
import {
  type IIngredientInputDto,
  IngredientService,
} from "shared/api/ingredient";
import { FridgeQueries } from "entities/fridge";

export const useUpdateIngredientMutation = (fridgeId?: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: async (ingredients: IIngredientInputDto[]) =>
      await IngredientService.updateIngredientMutation(ingredients, fridgeId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.detail, fridgeId],
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
