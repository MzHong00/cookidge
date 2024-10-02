import { FaBell } from "@react-icons/all-files/fa/FaBell";

import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <IconLink to={"/login"} title="로그인" className={styles.loginButton} />
      <IconButton
        src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
        className={styles.iconButton}
      />
      <IconButton
        Icon={FaBell}
        isCounterVisible
        counterValue={0}
        counterTheme="red"
        className={styles.iconButton}
      />
    </div>
  );
};
