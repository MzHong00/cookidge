import { useMutation } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { FridgeService, IFridge } from "shared/api/fridge";

export const useShareMemberMutation = (fridgeId?: IFridge["_id"]) => {
  return useMutation({
    mutationFn: (member_id: IUser["_id"]) =>
      FridgeService.addSharedMember(fridgeId, member_id),
    retry: false
  });
};
