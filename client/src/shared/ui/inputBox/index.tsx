import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  label?: string;
}

export const InputIconBox = ({
  Icon,
  label,
  name,
  className,
  ...props
}: Props) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {Icon && <Icon />}
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${className}`}
        {...props}
      />
    </div>
  );
};
