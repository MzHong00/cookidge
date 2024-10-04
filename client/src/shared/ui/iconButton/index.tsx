import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  src: string;
  title: string;
  isCounterVisible: boolean;
  counterTheme: "grey" | "red";
  counterValue: number;
}

export const IconButton = ({
  Icon,
  src,
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
      {src && (
        <img
          src={src}
          alt={title}
          className={styles.IconImage}
          referrerPolicy="no-referrer"
        />
      )}
      {Icon && <Icon className={styles.icon}/>}
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
