import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { IUser, IUserInputDTO } from "shared/api/user";
import { UserService } from "shared/api/user";
import { useAlertActions } from "shared/ui/alert";
import { UserQueries } from "entities/user";

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();
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

      const { name } = queryClient.getQueryData([UserQueries.keys.me]) as IUser;
      navigate(`/user/${name}`);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alertEnqueue({
        message: error.response?.data.message,
        type: "error",
      });
    },
  });
};
