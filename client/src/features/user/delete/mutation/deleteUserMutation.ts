import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IUser, UserService } from "shared/api/user";
import { UserQueries } from "entities/user";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserService.deleteUser(),
    onSuccess: () => {
      const { me, user } = UserQueries.keys;

      const myData = queryClient.getQueryData([me]) as IUser;

      queryClient.removeQueries({ queryKey: [me] });
      queryClient.removeQueries({ queryKey: [user, myData.name] });
    },
  });
};
