import { useState } from "react";
import styles from "./index.module.css";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea = ({
  label,
  name,
  maxLength,
  ...props
}: Props) => {
  const [text, setText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={text}
        maxLength={maxLength}
        onChange={handleTextChange}
        {...props}
      />
      <div className={styles.textCounter}>
        {text.length}/{maxLength}
      </div>
    </div>
  );
};
