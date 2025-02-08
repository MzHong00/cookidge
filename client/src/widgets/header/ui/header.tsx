import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line";

import { Logo } from "shared/ui/logo";
import { Navbar } from "shared/ui/navbar";
import { IconLink } from "shared/ui/iconLink";
import { useModal } from "shared/hooks/useModal";
import { IconButton } from "shared/ui/iconButton";
import { QueryWrapper } from "shared/ui/queryWrapper";
import { ProfileImage, ProfileImageSkeleton } from "shared/ui/profileImage";
import { UserQueries } from "entities/user";
import { LogoutButton } from "features/user/logout";
import { navItems } from "../consts/navigationItems";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo to={"/"} />
      <Navbar items={navItems} />
      <QueryWrapper
        supenseFallback={<ProfileImageSkeleton />}
        errorFallback={() => <LoginButton />}
      >
        <Profile />
      </QueryWrapper>
      <Suspense fallback={<ProfileImageSkeleton />}>
        <Profile />
      </Suspense>
    </header>
  );
};

const Profile = () => {
  const { modalRef, isOpen, toggleModal } = useModal();
  const { data: user } = useSuspenseQuery(UserQueries.meQuery());

  if (!user) return <LoginButton />;

  return (
    <div className={styles.userBar}>
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
    </div>
  );
};

const LoginButton = () => {
  return (
    <IconLink to="/login" className={styles.loginButton}>
      로그인
    </IconLink>
  );
};
