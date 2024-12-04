import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { IUser } from "shared/api/user";
import { InputBox } from "shared/ui/inputBox";
import { TextArea } from "shared/ui/textArea";
import { InputFile } from "shared/ui/inputFile";
import { IconButton } from "shared/ui/iconButton";
import { IUserInputDTO } from "shared/api/user/type";
import { usePreviewImages } from "shared/hooks/usePreviewImages";
import { useUpdateUserMutation } from "../mutation/updateUserMutation";
import { UserQueries } from "entities/user";

import styles from "./userEditForm.module.scss";

export const UserEditForm = () => {
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser;
  
  const { mutate, isPending } = useUpdateUserMutation();

  const {
    watch,
    register,
    handleSubmit,
  } = useForm<IUserInputDTO>({
    defaultValues: {
      name: me?.name,
      introduce: me?.introduce,
    },
  });

  const previewImages = usePreviewImages(watch("picture"));

  const onSubmit: SubmitHandler<IUserInputDTO> = (newUserData) => {
    if (isPending) return;

    mutate(newUserData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputFile
          id="pictures"
          className={styles.uploadPictureButton}
          previewUrl={`${
            previewImages.length === 0 ? me?.picture : previewImages
          }`}
          {...register(`picture`)}
        />
        <InputBox label="이메일" id="email" value={me?.email} disabled />
        <InputBox label="이름" {...register("name")} />
        <TextArea
          label="소개"
          length={watch("introduce")?.length || 0}
          maxLength={100}
          {...register("introduce")}
        />
        <IconButton className="w-full main-button">수정</IconButton>
    </form>
  );
};
