import { IconButton } from "shared/ui/iconButton";
import { useDeleteUserMutation } from "../mutation/deleteUserMutation";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DeleteUserButton = ({ style, ...props }: Props) => {
  const { mutate, isPending } = useDeleteUserMutation();

  const onClickDeleteUser = () => {
    mutate(undefined, {
      onSuccess: () => {
        window.history.replaceState(null, "", '/')
        window.location.reload(); // 페이지 새로고침을 추가하여 UI가 최신 상태로 반영되도록 함
      },
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
