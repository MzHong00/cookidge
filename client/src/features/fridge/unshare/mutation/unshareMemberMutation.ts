import { useMutation } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { FridgeService, IFridge } from "shared/api/fridge";

export const useUnshareMemberMutation = (fridgeId?: IFridge["_id"]) => {
  return useMutation({
    mutationFn: (member_id: IUser["_id"]) =>
      FridgeService.removeSharedMember(fridgeId, member_id),

    retry: false,
  });
};
