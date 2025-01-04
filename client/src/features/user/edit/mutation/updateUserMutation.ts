import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUserInputDTO } from "shared/api/user";
import { UserService } from "shared/api/user";
import { useAlertActions } from "shared/ui/alert";
import { UserQueries } from "entities/user";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (input: IUserInputDTO) => UserService.updateUser(input),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [UserQueries.keys.me] }),
        queryClient.invalidateQueries({ queryKey: [UserQueries.keys.user] }),
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
  });
};
