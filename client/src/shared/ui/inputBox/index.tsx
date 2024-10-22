import { IconType } from "@react-icons/all-files";

import styles from "./index.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: IconType;
  label?: string;
}

export const InputBox = ({ Icon, label, name, className, ...props }: Props) => {
  return (
    <div className={`${className} w-full`}>
      <label htmlFor={name} className={styles.label}>
        {Icon && <Icon />}
        {label}
      </label>
      <input id={name} name={name} className={`${styles.input}`} {...props} />
    </div>
  );
};
