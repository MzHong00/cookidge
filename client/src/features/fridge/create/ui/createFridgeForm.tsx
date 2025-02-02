import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import type { IFridgeFormInput } from "shared/api/fridge";
import { InputBox } from "shared/ui/inputBox";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { useCreateFridgeMutation } from "../mutation/createFridgeMutation";

import styles from "./createFridgeForm.module.css";

export const CreateFridgeForm = () => {
  const navigate = useNavigate();

  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useCreateFridgeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFridgeFormInput> = (data) => {
    if (isPending) return;

    openDialogMessage({
      message: `${data.name} 냉장고를 생성하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(data.name);
      },
    });
  };

  return (
    <FadeLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubjectBox title="냉장고 생성" className={styles.subjectBox}>
          <div>
            <InputBox
              label="이름"
              placeholder="냉장고 이름"
              {...register("name", { required: true, maxLength: 10 })}
              aria-invalid={errors.name ? "true" : "false"}
              autoComplete="off"
            />
            {errors.name?.type === "required" && (
              <p className="alert-text">*필수 항목</p>
            )}
            {errors.name?.type === "maxLength" && (
              <p className="alert-text">*10자 이내로 입력해주세요</p>
            )}
          </div>
          <div className={styles.actionBar}>
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className={styles.closeButton}
            >
              취소
            </IconButton>
            <IconButton className="main-button">생성</IconButton>
          </div>
        </SubjectBox>
      </form>
    </FadeLayout>
  );
};
