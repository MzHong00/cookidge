import { Outlet } from "react-router-dom";

import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import styles from "./index.module.css";
import ScrollToTop from "shared/lib/react-router/scrollToTop";

export default function Root() {
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
}
