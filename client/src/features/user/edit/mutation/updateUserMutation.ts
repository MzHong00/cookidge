import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UserQueries } from "entities/user";
import { useNavigate } from "react-router-dom";
import { UserService } from "shared/api/user";
import { IUserInputDTO } from "shared/api/user/type";

export const useUpdateUserMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: IUserInputDTO) => UserService.updateUser(input),
    onSuccess: async (user) => {
      await Promise.all([
      queryClient.invalidateQueries({ queryKey: [UserQueries.keys.me] }),
      queryClient.invalidateQueries({ queryKey: [UserQueries.keys.user, ] })
    ])

    navigate(`/user/${user?.name}`)
    },
  });
};
