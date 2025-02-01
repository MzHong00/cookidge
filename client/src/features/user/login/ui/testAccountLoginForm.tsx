import { useForm } from "react-hook-form";

import { InputBox } from "shared/ui/inputBox";
import { IconButton } from "shared/ui/iconButton";
import { useDialog } from "shared/hooks/useDialog";
import { useTestFormSubmit } from "../model/useTestFormSubmit";

import styles from "./loginForm.module.scss";

interface Inputs {
  code: string;
}

export const TestAccountLoginForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { ref, openDialog, closeDialog } = useDialog();
  const { errMsg, onSubmit } = useTestFormSubmit();

  return (
    <div>
      <button onClick={openDialog} className={styles.openButton}>
        테스트 계정 로그인
      </button>

      <dialog ref={ref} onClick={closeDialog}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.testAccountLoginForm}
        >
          <InputBox
            id="code"
            label="테스트 계정 로그인"
            placeholder="테스트 계정 코드"
            {...register("code")}
            autoComplete="off"
          />
          <span>※ Code: 5789</span>
          {errMsg && <p>*{errMsg}</p>}
          <IconButton>확인</IconButton>
        </form>
      </dialog>
    </div>
  );
};
