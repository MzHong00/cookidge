import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line";

import { Logo } from "shared/ui/logo";
import { IUser } from "shared/api/user";
import { Navbar } from "shared/ui/navbar";
import { IconLink } from "shared/ui/iconLink";
import { useModal } from "shared/hooks/useModal";
import { ProfileImage } from "shared/ui/profileImage";
import { IconButton } from "shared/ui/iconButton";
import { LogoutButton } from "features/user/logout";

import styles from "./header.module.scss";

interface Props {
  user?: IUser;
}

export const Header = ({ user }: Props) => {
  const { modalRef, isOpen, toggleModal } = useModal();

  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <div className={styles.userBar}>
        {user ? (
          <>
            <IconButton
              Icon={FaBell}
              isCounterVisible
              counterValue={0}
              counterTheme="red"
              className={styles.iconButton}
            />
            <IconButton className={styles.iconButton} onClick={toggleModal}>
              <ProfileImage src={user.picture} />
            </IconButton>
          </>
        ) : (
          <IconLink to="/login" className={styles.loginButton}>
            로그인
          </IconLink>
        )}
        {isOpen && user && (
          <nav ref={modalRef} className={styles.userMenu}>
            <IconLink to={`user/${user.name}`} Icon={RiUser3Line}>
              내 정보
            </IconLink>
            <LogoutButton />
          </nav>
        )}
      </div>
    </header>
  );
};
