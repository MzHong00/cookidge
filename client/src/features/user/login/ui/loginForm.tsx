import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

import { Logo } from "shared/ui/logo";
import { FadeLayout } from "shared/ui/fadeLayout";
import { SubjectBox } from "shared/ui/subjectBox";
import { IconButton } from "shared/ui/iconButton";
import { OAuthService } from "shared/api/oauth";
import { TestAccountLoginForm } from "..";

import styles from "./loginForm.module.scss";

export const LoginForm = ({ className }: { className?: string }) => {
  return (
    <FadeLayout className={`${styles.container} ${className}`}>
      <SubjectBox className={styles.loginForm}>
        <Logo to="/" className={styles.logo} />

        <main className={styles.content}>
          <div className={styles.introduce}>
            <h3>시작하기</h3>
            <p>계정에 로그인하여 다양한 서비스를 경험하세요.</p>
          </div>
          <IconButton
            Icon={FcGoogle}
            onClick={() => {
              OAuthService.redirectToGoogleOAuthForm();
            }}
            className={`${styles.googleOAuthButton}`}
          >
            <span>구글 계정으로 로그인</span>
          </IconButton>
        </main>
        <TestAccountLoginForm />
      </SubjectBox>
    </FadeLayout>
  );
};
