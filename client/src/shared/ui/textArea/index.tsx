import React, { forwardRef } from "react";

import styles from "./index.module.scss";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  length?: number | string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, length ,maxLength, ...props }, ref) => {
    return (
      <div className={styles.container}>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          id={id}
          maxLength={maxLength}
          ref={ref}
          {...props}
        />
        <div className={styles.counter}>
          {length}/{maxLength}
        </div>
      </div>
    );
  }
);
