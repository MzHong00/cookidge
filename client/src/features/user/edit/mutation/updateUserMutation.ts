import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserService } from "shared/api/user";
import { IUserInputDTO } from "shared/api/user/type";
import { UserQueries } from "entities/user";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: IUserInputDTO) => UserService.updateUser(input),
    onSuccess: async (user) => {
      await Promise.all([
      queryClient.invalidateQueries({ queryKey: [UserQueries.keys.me] }),
      queryClient.invalidateQueries({ queryKey: [UserQueries.keys.user, ] })
    ])
    },
  });
};
