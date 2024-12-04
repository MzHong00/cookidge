import { IconButton } from "shared/ui/iconButton";
import { IFridge } from "shared/api/fridge";
import { useDeleteFridgeMutation } from "..";
import { useNavigate } from "react-router-dom";

interface Props {
  id: IFridge["_id"];
}

export const DeleteFridgeButton = ({ id }: Props) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteFridgeMutation(id);

  const onClickDeleteFridge = () => {
    if (isPending) return;
    mutate();
    navigate(-1);
  };

  return <IconButton onClick={onClickDeleteFridge}>삭제</IconButton>;
};
