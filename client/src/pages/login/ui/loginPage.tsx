import { LoginForm } from "features/user";

import styles from "./loginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <LoginForm className={styles.loginBox} />
    </div>
  );
};
