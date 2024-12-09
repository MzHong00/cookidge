import { useMutation, useQueryClient } from "@tanstack/react-query";

import { type IUser } from "shared/api/user";
import { FridgeService, type IFridge } from "shared/api/fridge";
import { FridgeQueries } from "entities/fridge";

export const useUnshareMemberMutation = (
  fridgeId: IFridge["_id"],
  member_id: IUser["_id"]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => FridgeService.removeSharedMember(fridgeId, member_id),
    onSuccess: () => {
      queryClient.setQueryData(
        [FridgeQueries.keys.detail, fridgeId],
        (data: IFridge) => ({
          ...data,
          allowed_users: data.allowed_users?.filter(
            (user) => user._id !== member_id
          ),
        })
      );
    },
    retry: false,
  });
};
