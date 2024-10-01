import { Link, type LinkProps } from "react-router-dom";
import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends LinkProps {
  Icon?: IconType;
  title?: string;
}

export const IconLink = ({
  to,
  Icon,
  title,
  children,
  className,
  ...props
}: Props) => {
  return (
    <Link to={to} className={`${styles.iconLink} ${className}`} {...props}>
      {Icon && <Icon />}
      {title && <p>{title}</p>}
      {children}
    </Link>
  );
};
