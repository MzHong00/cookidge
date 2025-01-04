import { SubmitHandler, useForm } from "react-hook-form";

import { InputBox } from "shared/ui/inputBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { type IFridge, IFridgeFormInput } from "shared/api/fridge";
import { useUpdateFridgeMutation } from "../mutation/updateFridgeMutation";

import styles from "./updateFridgeForm.module.scss";

interface Props {
  fridge_id: IFridge["_id"];
  defaultName?: string;
}

export const UpdateFridgeForm = ({ fridge_id, defaultName }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUpdateFridgeMutation(fridge_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFridgeFormInput>({
    defaultValues: {
      name: defaultName,
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFridgeFormInput> = (data) => {
    if (isPending) return;
    openDialogMessage({
      message: `${data.name}(으)로 이름을 바꾸시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(data.name);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-column">
      <SubjectBox title="냉장고 이름 변경">
        <div className="flex-row">
          <InputBox
            placeholder="변경할 이름을 입력하세요"
            {...register("name", { required: true, maxLength: 10 })}
          />
          <input type="submit" value="변경" className={styles.submitButton} />
        </div>
        <div className={styles.errorMessage}>
          {errors.name?.type === "required" && (
            <p className="alert-text">*필수 항목</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p className="alert-text">*10자 이내로 입력해주세요</p>
          )}
        </div>
      </SubjectBox>
    </form>
  );
};
