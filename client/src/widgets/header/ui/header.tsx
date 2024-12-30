import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line";

import { Logo } from "shared/ui/logo";
import { Navbar } from "shared/ui/navbar";
import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { ProfileImage, ProfileImageSkeleton } from "shared/ui/profileImage";
import { useModal } from "shared/hooks/useModal";
import { UserQueries } from "entities/user";
import { LogoutButton } from "features/user/logout";
import { navItems } from "../consts/navigationItems";

import styles from "./header.module.scss";

export const Header = () => {
  const { modalRef, isOpen, toggleModal } = useModal();
  const { data: user, isFetching } = useQuery(UserQueries.meQuery());

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <Logo />
      </Link>

      <Navbar items={navItems}/>

      <div className={styles.userBar}>
        {user ? (
          <>
            <IconButton className={styles.iconButton} onClick={toggleModal}>
              <ProfileImage src={user.picture} />
            </IconButton>

            {isOpen && (
              <nav ref={modalRef} className={styles.userMenu}>
                <IconLink to={`user/${user.name}`} Icon={RiUser3Line}>
                  내 정보
                </IconLink>
                <LogoutButton />
              </nav>
            )}
          </>
        ) : (
          <>
            {isFetching ? (
              <ProfileImageSkeleton />
            ) : (
              <IconLink to="/login" className={styles.loginButton}>
                로그인
              </IconLink>
            )}
          </>
        )}
      </div>
    </header>
  );
};
