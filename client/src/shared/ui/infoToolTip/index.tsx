import { RiInformationLine } from "@react-icons/all-files/ri/RiInformationLine";

import styles from "./index.module.css";

interface Props {
  message: string;
}

export const InfoTooltip = ({ message }: Props) => {
  return (
    <div className={styles.tooltipWrapper}>
      <RiInformationLine className={styles.icon} />
      <div className={styles.tooltipText}>{message}</div>
    </div>
  );
};