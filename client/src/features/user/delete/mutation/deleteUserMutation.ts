import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser, UserService } from "shared/api/user";
import { UserQueries } from "entities/user";
import { useAlertActions } from "shared/ui/alert";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: () => UserService.deleteUser(),
    onSuccess: async (data) => {
      const { me, user } = UserQueries.keys;

      const myData = queryClient.getQueryData([me]) as IUser;

      await Promise.all([
        queryClient.removeQueries({ queryKey: [me] }),
        queryClient.removeQueries({ queryKey: [user, myData.name] }),
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
