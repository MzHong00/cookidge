import { RiLogoutBoxLine } from "@react-icons/all-files/ri/RiLogoutBoxLine";
import { AuthService } from "shared/api/auth";

import { IconButton } from "shared/ui/iconButton";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

export const LogoutButton = (props: Props) => {
  const onClickLogout = async () => {
    await AuthService.logout();
    window.location.reload();
  };

  return (
    <IconButton Icon={RiLogoutBoxLine} onClick={onClickLogout} {...props}>
      로그아웃
    </IconButton>
  );
};
