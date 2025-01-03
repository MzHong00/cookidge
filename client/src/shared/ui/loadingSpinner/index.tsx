import { RiLoader3Line } from "@react-icons/all-files/ri/RiLoader3Line";

import styles from "./index.module.scss";

interface Props {
  msg?: string;
}

export const LoadingSpinner = ({ msg }: Props) => {
  return (
    <div className={styles.spinner}>
      <RiLoader3Line />
      {msg && <p>{msg}</p>}
    </div>
  );
};
