import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserQueries } from "entities/user";
import { UserService } from "shared/api/user";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserService.deleteUser(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [UserQueries.keys.me] });
    },
  });
};
