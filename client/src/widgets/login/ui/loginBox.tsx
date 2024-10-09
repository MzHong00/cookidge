import { RiKakaoTalkFill } from "@react-icons/all-files/ri/RiKakaoTalkFill";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { InputBox } from "shared/ui/inputBox";

import styles from "./loginBox.module.css";

export const LoginBox = () => {
  return (
    <SubjectBox
      title="시작하기"
      subtitle="계정에 로그인하여 다양한 서비스를 경험하세요."
      className={styles.loginContainer}
    >
      <form className={styles.loginForm}>
        <InputBox
          label="이메일"
          name="email"
          placeholder="foodMate@example.com"
        />
        <IconButton title="이메일 인증" className={styles.loginButton} />
      </form>

      <footer>
        <section className={styles.divideLine}>
          <p>SNS로 로그인</p>
          <hr />
        </section>

        <section className={styles.oauthBar}>
          <IconButton
            Icon={RiKakaoTalkFill}
            className={`${styles.oauthIcon} ${styles.kakaoIcon}`}
          />
          <IconButton Icon={FcGoogle} className={styles.oauthIcon} />
        </section>
      </footer>
    </SubjectBox>
  );
};
