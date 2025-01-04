import type { IFridge } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { useDeleteFridgeMutation } from "..";

interface Props {
  id: IFridge["_id"];
}

export const DeleteFridgeButton = ({ id }: Props) => {
  const { mutateAsync, isPending } = useDeleteFridgeMutation(id);
  const { openDialogMessage } = useConfirmDialogActions();

  const onClickDeleteFridge = () => {
    if (isPending) return;

    openDialogMessage({
      message: "냉장고를 삭제하시겠습니까?",
      requestFn: async () => {
        await mutateAsync();
      },
    });
  };

  return <IconButton onClick={onClickDeleteFridge}>삭제</IconButton>;
};
