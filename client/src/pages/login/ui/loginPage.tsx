import { LoginForm } from "features/user/login";

import styles from "./loginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <LoginForm className={styles.loginForm} />
    </div>
  );
};
