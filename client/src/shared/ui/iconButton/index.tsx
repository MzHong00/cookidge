import { IconType } from "@react-icons/all-files";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  src: string;
  isCounterVisible: boolean;
  counterTheme: "grey" | "red";
  counterValue: number;
}

export const IconButton = ({
  Icon,
  src,
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
          alt=""
          referrerPolicy="no-referrer"
        />
      )}
      {Icon && <Icon />}
      {children}
      {isCounterVisible && (
        <div
          className={styles.counter}
          style={{ backgroundColor: counterTheme }}
        >
          {counterValue}
        </div>
      )}
    </button>
  );
};
