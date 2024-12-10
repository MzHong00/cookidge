import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IFridge } from "shared/api/fridge";
import { useAlertActions } from "shared/ui/alert";
import { IIngredientInputDto, IngredientService } from "shared/api/ingredient";
import { FridgeQueries } from "entities/fridge";

export const useCreateIngredientMutation = (fridgeId?: IFridge["_id"]) => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationKey: [FridgeQueries.keys.detail, fridgeId],
    mutationFn: (ingredients: IIngredientInputDto[]) =>
      IngredientService.createIngredientMutation(ingredients, fridgeId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [FridgeQueries.keys.detail, fridgeId],
      });

      alertEnqueue({
        message: data.message,
        type: 'success'
      })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error"
      })
    }
  });
};
