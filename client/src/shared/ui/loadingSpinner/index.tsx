import { RiLoader3Line } from "@react-icons/all-files/ri/RiLoader3Line";

import styles from "./index.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <RiLoader3Line className={styles.spinner} />
    </div>
  );
};
