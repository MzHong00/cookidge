import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { IFridgeFormInput } from "shared/api/fridge";
import { InputBox } from "shared/ui/inputBox";
import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useCreateFridgeMutation } from "../mutation/createFridgeMutation";

import styles from "./createFridgeForm.module.css";


export const CreateFridgeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeFormInput>();
  const navigate = useNavigate();
  const { mutate } = useCreateFridgeMutation();

  const onSubmit: SubmitHandler<IFridgeFormInput> = (data) => {
    mutate(data.name);
    navigate('/dashboard/fridge');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FramerFadeLayout>
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
            <IconLink to="/dashboard/fridge" className={styles.closeButton}>
              취소
            </IconLink>
            <IconButton className="main-button">생성</IconButton>
          </div>
        </SubjectBox>
      </FramerFadeLayout>
    </form>
  );
};
