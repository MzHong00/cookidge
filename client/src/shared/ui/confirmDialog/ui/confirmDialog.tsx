import { useNavigate } from "react-router-dom";

import { Logo } from "shared/ui/logo";
import { FadeLayout } from "shared/ui/fadeLayout";
import { IconButton } from "shared/ui/iconButton";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { useHandleShowingDialog, useConfirmDialogStore } from "..";

import styles from "./confirmDialog.module.scss";

export const ConfirmDialog = () => {
  const navigate = useNavigate();

  const { ref } = useHandleShowingDialog();
  const { isOpen, isLoading,  payload, actions } = useConfirmDialogStore();
  const { message, processMessage,descriptions, requestFn, option } = payload;

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
      <FadeLayout className={styles.dialog}>
        <header className={styles.header}>
          <Logo />
          <h4>{message}</h4>
          <ol className={styles.descriptions}>
            {descriptions.map((description, i) => (
              <li key={i}>{description}</li>
            ))}
          </ol>
        </header>
        {isLoading && <LoadingSpinner msg={processMessage}/>}
        <main className={styles.actionBar}>
          <IconButton
            className="main-button"
            onClick={onClickConfirm}
            disabled={isLoading}
          >
            확인
          </IconButton>
          <IconButton onClick={actions.closeDialog} disabled={isLoading}>
            취소
          </IconButton>
        </main>
      </FadeLayout>
    </dialog>
  );
};
