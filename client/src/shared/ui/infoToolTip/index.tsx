import { RiInformationLine } from "@react-icons/all-files/ri/RiInformationLine";

import styles from "./index.module.scss";

interface Props {
  message: string;
}

export const InfoTooltip = ({ message }: Props) => {
  return (
    <div className={styles.tooltipWrapper}>
      <RiInformationLine className={styles.icon} />
      <span className={styles.tooltipText}>{message}</span>
    </div>
  );
};