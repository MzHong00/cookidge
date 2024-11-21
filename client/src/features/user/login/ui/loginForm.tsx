import { RiKakaoTalkFill } from "@react-icons/all-files/ri/RiKakaoTalkFill";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Logo } from "shared/ui/logo";
import { IconBox } from "shared/ui/iconBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { OAuthService } from "../../../../shared/api/oauth/service";

import styles from "./loginForm.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({ className, ...props }: Props) => {
  const googleOAuthHandler = async () => {
    await OAuthService.googleOAuth();
  }

  return (
    <SubjectBox className={`${styles.container} ${className}`} {...props}>
      <Logo className={styles.logo} />

      <main className="flex-column-center">
        <div className={styles.introduce}>
          <h3>시작하기</h3>
          <p>계정에 로그인하여 다양한 서비스를 경험하세요.</p>
        </div>
        <button className={`${styles.oauthButton} ${styles.kakaoOAuth}`}>
          <IconBox Icon={RiKakaoTalkFill} className={styles.oauthIcon} />
          <b>카카오 계정으로 로그인</b>
        </button>
        <button className={`${styles.oauthButton} ${styles.googleOAuth}`} onClick={googleOAuthHandler}>
          <IconBox Icon={FcGoogle} className={styles.oauthIcon} />
          <b>구글 계정으로 로그인</b>
        </button>
      </main>
    </SubjectBox>
  );
};
