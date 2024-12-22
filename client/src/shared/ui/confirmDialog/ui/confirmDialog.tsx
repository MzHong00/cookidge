import { useNavigate } from "react-router-dom";

import { Logo } from "shared/ui/logo";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useHandleShowingDialog, useConfirmDialogStore } from "..";

import styles from "./confirmDialog.module.scss";
import { IconButton } from "shared/ui/iconButton";

export const ConfirmDialog = () => {
  const navigate = useNavigate();

  const { ref } = useHandleShowingDialog();
  const { isOpen, isLoading, payload, actions } = useConfirmDialogStore();
  const { message, descriptions, requestFn, option } = payload;

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
      <FramerFadeLayout className={styles.dialog}>
        <header className={styles.header}>
          <Logo />
          <h4>{message}</h4>
          <ol className={styles.descriptions}>
            {descriptions.map((description, i) => (
              <li key={i}>{description}</li>
            ))}
          </ol>
        </header>
        <main className={styles.actionBar}>
          <IconButton
            className="main-button"
            onClick={onClickConfirm}
            disabled={isLoading}
          >
            확인
          </IconButton>
          <IconButton onClick={actions.closeDialog}>취소</IconButton>
        </main>
      </FramerFadeLayout>
    </dialog>
  );
};
