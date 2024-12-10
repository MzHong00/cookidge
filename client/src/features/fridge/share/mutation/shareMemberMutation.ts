import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { useAlertActions } from "shared/ui/alert";
import { FridgeService, IFridge } from "shared/api/fridge";

export const useShareMemberMutation = (fridgeId?: IFridge["_id"]) => {
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (member_id: IUser["_id"]) =>
      FridgeService.addSharedMember(fridgeId, member_id),
    onSuccess: (data) => {
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
    retry: false,
  });
};
