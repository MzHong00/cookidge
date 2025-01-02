import { RiInformationLine } from "@react-icons/all-files/ri/RiInformationLine";

import styles from "./index.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const InfoTooltip = ({ message, className, ...props }: Props) => {
  return (
    <div className={`${styles.tooltipWrapper} ${className}`} {...props}>
      <RiInformationLine className={styles.icon} />
      <span className={styles.tooltipText}>{message}</span>
    </div>
  );
};
