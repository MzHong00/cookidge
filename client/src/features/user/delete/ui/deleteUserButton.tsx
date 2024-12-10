import { IconButton } from "shared/ui/iconButton";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { useDeleteUserMutation } from "../mutation/deleteUserMutation";
import { useNavigate } from "react-router-dom";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DeleteUserButton = ({ style, ...props }: Props) => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteUserMutation();
  const { openDialogMessage } = useConfirmDialogActions();

  const onClickDeleteUser = () => {
    if (isPending) return;

    openDialogMessage({
      message: "정말 회원을 탈퇴하시겠습니까?",
      requestFn: async () => {
        await mutateAsync();
        navigate("/");
      },
      option: { backspace: false },
    });
  };

  return (
    <IconButton
      onClick={onClickDeleteUser}
      style={{ backgroundColor: "red", color: "white", ...style }}
      {...props}
    >
      회원 탈퇴
    </IconButton>
  );
};
