import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: IconType;
}

export const IconBox = ({
  Icon,
  children,
  className,
  ...props
}: Props) => {
  return (
    <div className={`${styles.iconBox} ${className}`} {...props}>
      {Icon && <Icon className={styles.icon} />}
      {children}
    </div>
  );
};
