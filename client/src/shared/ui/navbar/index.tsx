import { useLocation } from "react-router-dom";
import type { IconType } from "@react-icons/all-files";

import { IconLink } from "shared/ui/iconLink";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
  items: {
    to: string;
    Icon?: IconType;
    content: string;
  }[];
}

export const Navbar = ({ items, className, ...props }: Props) => {
  const location = useLocation();

  return (
    <nav className={`${styles.navBar} ${className}`} {...props}>
      {items.map((item) => (
        <IconLink
          key={item.to}
          to={`${item.to}`}
          Icon={item?.Icon}
          className={styles.navItem}
          style={{
            backgroundColor:
              `${location.pathname.split("/")[1]}` === item.to.split("/")[0]
                ? "whitesmoke"
                : "transparent",
          }}
        >
          <p>{item.content}</p>
        </IconLink>
      ))}
    </nav>
  );
};
