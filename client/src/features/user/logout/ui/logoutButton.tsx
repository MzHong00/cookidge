import { RiLogoutBoxLine } from "@react-icons/all-files/ri/RiLogoutBoxLine";

import { AuthService } from "shared/api/auth";
import { IconButton } from "shared/ui/iconButton";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogoutButton = (props: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const onClickLogout = async () => {
    openDialogMessage({
      message: "로그아웃 하시겠습니까?",
      requestFn: async () => {
        await AuthService.logout();
      },
      option: { backspace: false },
    });
  };

  return (
    <IconButton Icon={RiLogoutBoxLine} onClick={onClickLogout} {...props}>
      로그아웃
    </IconButton>
  );
};
