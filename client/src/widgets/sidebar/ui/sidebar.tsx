import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { RiLayout2Line } from "@react-icons/all-files/ri/RiLayout2Line";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { Logo } from "widgets/logo";
import { IconLink } from "shared/ui/iconLink";

import styles from "./sidebar.module.css";

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <nav className={styles.navBar}>
        <IconLink to={"/"} Icon={RiHome5Line} title="홈" />
        <IconLink to={"/dashboard"} Icon={RiLayout2Line} title="대시보드" />
        <IconLink to={"/search"} Icon={RiSearchLine} title="검색" />
      </nav>
    </aside>
  );
};
