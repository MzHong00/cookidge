import { IconButton } from "shared/ui/iconButton";
import { InputBox } from "shared/ui/inputBox";
import { TextArea } from "shared/ui/textArea";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { CloduinaryImageUploader } from "shared/ui/cloudinary";

import styles from "./userEditForm.module.css";

export const UserEditForm = () => {
  return (
    <form className={styles.form}>
      <FramerFadeLayout className={styles.container}>
        <CloduinaryImageUploader
          name="picture"
          defaultImgSrc="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
          className={styles.profilesPicture}
        />
        <InputBox label="식별ID" id="id" defaultValue={"#홍길동123"} disabled />
        <InputBox label="이름" name="name" defaultValue={"홍길동"}/>
        <TextArea label={"소개"} name="introduce" maxLength={100} defaultValue={"저는 홍길동입니다."}/>
        <IconButton className={styles.submitButton}>수정</IconButton>
      </FramerFadeLayout>
    </form>
  );
};
