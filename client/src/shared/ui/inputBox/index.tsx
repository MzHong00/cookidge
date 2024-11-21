import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  label?: string;
}

export const InputBox = forwardRef<HTMLInputElement, Props>(
  ({ Icon, id, label, className, ...props }, ref) => {
    return (
      <div className={`${className} w-full`}>
        {(label || Icon) && (
          <label htmlFor={id} className={styles.label}>
            {Icon && <Icon />}
            {label}
          </label>
        )}
        <input id={id} ref={ref} className={`${styles.input}`} {...props} />
      </div>
    );
  }
);
