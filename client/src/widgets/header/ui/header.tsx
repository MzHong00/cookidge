import { Link } from "react-router-dom";
import { FaBell } from "@react-icons/all-files/fa/FaBell";

import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { Logo } from "shared/ui/logo";
import { Navbar } from "shared/ui/navbar";
import { useModal } from "shared/hooks/useModal";

import styles from "./header.module.css";

export const Header = () => {
  const { modalRef, isOpen, toggleModal } = useModal();

  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
      <div className={styles.userBar}>
        <IconLink to={"/login"} className={styles.loginButton} >로그인</IconLink>
        <IconButton
          Icon={FaBell}
          isCounterVisible
          counterValue={0}
          counterTheme="red"
          className={styles.iconButton}
        />
        <IconButton
          src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
          className={styles.iconButton}
          onClick={toggleModal}
        />
        {isOpen && (
          <nav ref={modalRef} className={styles.userMenu}>
            <Link to={"user"} className={styles.userProfile}>
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
                className={styles.userProfileImage}
                alt=""
              />
              <div>
                <b>홍길동</b>
                <p>rawfe@gamil.com</p>
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
