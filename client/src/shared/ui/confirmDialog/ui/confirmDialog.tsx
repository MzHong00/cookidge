import { useNavigate } from "react-router-dom";

import { Logo } from "shared/ui/logo";
import { useHandleShowingDialog, useConfirmDialogStore } from "..";

import styles from "./confirmDialog.module.scss";

export const ConfirmDialog = () => {
  const navigate = useNavigate();

  const { ref } = useHandleShowingDialog();
  const { isOpen, isLoading, payload, actions } = useConfirmDialogStore();
  const { message, requestFn, option } = payload;

  const onClickConfirm = async () => {
    actions.setIsLoading(true);

    try {
      await requestFn();
      option.backspace && navigate(-1);
    } catch (error) {
    } finally {
      actions.setIsLoading(false);
      actions.closeDialog();
    }
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
