import { Outlet } from "react-router-dom";

import ScrollToTop from "shared/lib/react-router/scrollToTop";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import styles from "./root.module.css";

export const Root = () => {
  return (
    <div className={styles.root}>
      <ScrollToTop />
      <Header />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
