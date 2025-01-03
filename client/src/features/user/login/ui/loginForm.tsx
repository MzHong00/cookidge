import { Link } from "react-router-dom";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Logo } from "shared/ui/logo";
import { IconBox } from "shared/ui/iconBox";
import { OAuthService } from "shared/api/oauth";
import { SubjectBox } from "shared/ui/subjectBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./loginForm.module.scss";
import { InfoTooltip } from "shared/ui/infoToolTip";

interface Props {
  className: string;
}

export const LoginForm = ({ className }: Props) => {
  const googleOAuthHandler = async () => {
    await OAuthService.googleOAuth();
  };

  return (
    <FramerFadeLayout className={`${styles.container} ${className}`}>
      <SubjectBox className={styles.loginForm}>
        <InfoTooltip message="로그인이 정상적이지 않을 경우, 브라우저 설정에서 트래커 추적 방지를 허용해 주세요." />

        <Link to="/">
          <Logo className={styles.logo} />
        </Link>

        <main className={styles.content}>
          <div className={styles.introduce}>
            <h3>시작하기</h3>
            <p>계정에 로그인하여 다양한 서비스를 경험하세요.</p>
          </div>
          <button
            className={`${styles.oauthButton} ${styles.googleOAuth}`}
            onClick={googleOAuthHandler}
          >
            <IconBox Icon={FcGoogle} className={styles.oauthIcon} />
            <b>구글 계정으로 로그인</b>
          </button>
        </main>
      </SubjectBox>
    </FramerFadeLayout>
  );
};
