import React, { forwardRef } from "react";
import { IconType } from "@react-icons/all-files";

import styles from "./index.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
}

export const IconButton = forwardRef<HTMLButtonElement, Partial<Props>>(
  ({ Icon, color, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.iconButton} ${className}`}
        {...props}
      >
        {Icon && <Icon color={color} />}
        {children}
      </button>
    );
  }
);
