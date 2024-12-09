import { useNavigate } from "react-router-dom";

import { Logo } from "shared/ui/logo";
import { useConfirmDialogStore } from "shared/lib/zustand/confirmDialogStore";
import { useHandleShowingDialog } from "../model/useHandleShowingDialog";

import styles from "./confirmDialog.module.scss";

export const ConfirmDialog = () => {
  const navigate = useNavigate();
  const { ref } = useHandleShowingDialog();

  const { isOpen, isLoading, payload, actions } = useConfirmDialogStore();
  const { message, requestFn, option } = payload;

  const onClickConfirm = async () => {
    const { backspace } = option;
    console.log(backspace);
    

    actions.setIsLoading(true);
    await requestFn();
    actions.closeDialog();

    if (backspace) navigate(-1);
  };

  if (!isOpen) return null;

  return (
    <dialog ref={ref}>
      {isLoading && <div className={styles.loadingSpinner} />}
      <div className={styles.dialog}>
        <header className={styles.header}>
          <Logo />
          <p>{message}</p>
        </header>
        <main className={styles.actionBar}>
          <button
            className="main-button"
            onClick={onClickConfirm}
            disabled={isLoading}
          >
            확인
          </button>
          <button onClick={actions.closeDialog}>취소</button>
        </main>
      </div>
    </dialog>
  );
};
