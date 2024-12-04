import React, { forwardRef } from "react";

import styles from "./index.module.css";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  length?: number | string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ id, label, length ,maxLength, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          maxLength={maxLength}
          ref={ref} // Attach the forwarded ref here
          {...props}
        />
        <div className={styles.textCounter}>
          {length}/{maxLength}
        </div>
      </div>
    );
  }
);
