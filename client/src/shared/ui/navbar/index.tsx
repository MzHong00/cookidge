import { useLocation } from "react-router-dom";

import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { RiLayout2Line } from "@react-icons/all-files/ri/RiLayout2Line";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";

import { IconLink } from "shared/ui/iconLink";

import styles from "./index.module.css";

const navItem = [
  {
    to: "/dashboard",
    Icon: RiLayout2Line,
    title: "대시보드",
  },
  {
    to: "/",
    Icon: RiHome5Line,
    title: "홈",
  },
  {
    to: "/search",
    Icon: RiSearchLine,
    title: "검색",
  },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className={styles.navBar}>
      {navItem.map((item) => (
        <IconLink
          key={item.to}
          to={`${item.to}`}
          Icon={item.Icon}
          style={{
            backgroundColor:
              `/${location.pathname.split("/")[1]}` === item.to
                ? "whitesmoke"
                : "transparent",
          }}
        >
          {item.title}
        </IconLink>
      ))}
    </nav>
  );
};
