import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import type { IUserInputDTO } from "shared/api/user";
import { InputBox } from "shared/ui/inputBox";
import { TextArea } from "shared/ui/textArea";
import { InputFile } from "shared/ui/inputFile";
import { IconButton } from "shared/ui/iconButton";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { usePreviewImages } from "shared/hooks/usePreviewImages";
import { compressImageToBase64 } from "shared/lib/imageCompression";
import { UserQueries } from "entities/user";
import { useUpdateUserMutation } from "../mutation/updateUserMutation";

import styles from "./userEditForm.module.scss";

interface UserEditInputs extends Omit<IUserInputDTO, "picture"> {
  picture: File[];
}

export const UserEditForm = () => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useUpdateUserMutation();
  const { data: me } = useQuery(UserQueries.meQuery());

  const { watch, register, handleSubmit } = useForm<UserEditInputs>({
    defaultValues: {
      name: me?.name,
      introduce: me?.introduce,
    },
  });

  const previewImages = usePreviewImages(watch("picture"));

  const onSubmit: SubmitHandler<UserEditInputs> = async (user) => {
    const { name, introduce, picture } = user;

    openDialogMessage({
      message: `프로필을 수정하시겠습니까?`,
      requestFn: async () => {
        const compressedPicture = (await compressImageToBase64(picture[0], {
          maxSizeMB: 2,
        })) as string | undefined;
        
        await mutateAsync({
          name: name,
          introduce: introduce,
          picture: compressedPicture,
        });
      },
      option: {backspace: false},
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputFile
        id="pictures"
        className={styles.imageInput}
        previewUrl={`${
          previewImages.length === 0 ? me?.picture : previewImages
        }`}
        {...register(`picture`)}
      />
      <InputBox label="이메일" id="email" value={me?.email} disabled />
      <InputBox label="이름" {...register("name")} />
      <TextArea label="소개" maxLength={100} {...register("introduce")} />
      <IconButton className="w-full main-button" disabled={isPending}>
        수정
      </IconButton>
    </form>
  );
};
