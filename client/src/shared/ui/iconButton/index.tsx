import React, { forwardRef } from "react";
import { IconType } from "@react-icons/all-files";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  isCounterVisible: boolean;
  counterTheme: "grey" | "red";
  counterValue: number;
}

export const IconButton = forwardRef<HTMLButtonElement, Partial<Props>>(
  (
    {
      Icon,
      isCounterVisible = false,
      counterTheme,
      counterValue,
      color,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`${styles.iconButton} ${className}`}
        {...props}
      >
        {Icon && <Icon color={color} />}
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
  }
);
