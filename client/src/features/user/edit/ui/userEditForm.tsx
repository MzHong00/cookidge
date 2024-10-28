import { IconButton } from "shared/ui/iconButton";
import { InputBox } from "shared/ui/inputBox";
import { TextArea } from "shared/ui/textArea";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { CloduinaryImageUploader } from "shared/ui/cloudinary";
import { useGlobalStore } from "shared/lib/zustand/useStore";

import styles from "./userEditForm.module.css";

export const UserEditForm = () => {
  const me = useGlobalStore(state=>state.user);

  return (
    <form className={styles.form}>
      <FramerFadeLayout className="flex-column-center">
        <CloduinaryImageUploader
          name="picture"
          defaultImgSrc={me?.picture}
          className={styles.profilesPicture}
        />
        <InputBox label="이메일" id="email" value={me?.email} disabled />
        <InputBox label="이름" name="name" defaultValue={me?.name}/>
        <TextArea label="소개" name="introduce" maxLength={100} defaultValue={me?.introduce}/>
        <IconButton className="w-full main-button">수정</IconButton>
      </FramerFadeLayout>
    </form>
  );
};
