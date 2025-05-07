import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import type { IUser } from "shared/api/user";
import { useAlertActions } from "shared/ui/alert";
import { FridgeService, type IFridge } from "shared/api/fridge";

export const useShareMemberMutation = (fridgeId: IFridge["_id"]) => {
  const { alertEnqueue } = useAlertActions();

  return useMutation({
    mutationFn: (inviteName: IUser["name"]) =>
      FridgeService.addSharedMember(fridgeId, inviteName),
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
