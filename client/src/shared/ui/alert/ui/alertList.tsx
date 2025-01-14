import { useEffect } from "react";
import { createPortal } from "react-dom";
import { RiCheckLine } from "@react-icons/all-files/ri/RiCheckLine";
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine";

import { FadeLayout } from "shared/ui/fadeLayout";
import { type AlertTypes, useAlertActions, useAlertQueue } from "..";

import styles from "./alertList.module.scss";

const Alert = ({ message, type }: AlertTypes) => {
  const { alertDequeue } = useAlertActions();
  const isSuccess = type === "success";

  useEffect(() => {
    setTimeout(() => {
      alertDequeue();
    }, 2000);
  }, [alertDequeue]);

  return (
    <FadeLayout
      className={styles.alert}
      style={{ backgroundColor: isSuccess ? "green" : "red" }}
    >
      {isSuccess ? <RiCheckLine /> : <RiErrorWarningLine />}
      {message}
    </FadeLayout>
  );
};

export const AlertList = () => {
  const queue = useAlertQueue();

  if (queue.length === 0) return null;

  return createPortal(
    <div className={styles.alertList}>
      {queue.map((alert, i) => (
        <Alert key={`${alert.message}${i}`} {...alert} />
      ))}
    </div>,
    document.body
  );
};
