import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  IconUrl: string;
  title: string;
  isCounterVisible: boolean;
  counterTheme: "grey" | "red";
  counterValue: number;
}

export const IconButton = ({
  Icon,
  IconUrl,
  title,
  isCounterVisible = false,
  counterTheme,
  counterValue,
  children,
  className,
  ...props
}: Partial<Props>) => {
  return (
    <button className={`${styles.iconButton} ${className}`} {...props}>
      {IconUrl && (
        <img src={IconUrl} alt={title} className={styles.IconImage} referrerPolicy="no-referrer"/>
      )}
      {Icon && <Icon />}
      {title && <p>{title}</p>}
      {isCounterVisible && (
        <div
          className={styles.counter}
          style={{ backgroundColor: counterTheme }}
        >
          {counterValue}
        </div>
      )}
      {children}
    </button>
  );
};
