import { Link } from "react-router-dom";
import { FaBell } from "@react-icons/all-files/fa/FaBell";

import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { Logo } from "shared/ui/logo";
import { Navbar } from "shared/ui/navbar";
import { useModal } from "shared/hooks/useModal";
import { useGlobalStore } from "shared/lib/zustand/useStore";

import styles from "./header.module.scss";

export const Header = () => {
  const user = useGlobalStore((state) => state.user);
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
            <IconButton
              src={user.picture}
              className={styles.iconButton}
              onClick={toggleModal}
            />
          </>
        ) : (
          <IconLink to="/login" className={styles.loginButton}>
            로그인
          </IconLink>
        )}
        {isOpen && user && (
          <nav ref={modalRef} className={styles.userMenu}>
            <Link to={`user/${user.name}`} className={styles.userProfile}>
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
                className={styles.userProfileImage}
                alt=""
              />
              <div>
                <b>{user?.name}</b>
                <p>{user?.email}</p>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
