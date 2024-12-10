import { Outlet, useLocation } from "react-router-dom";

import { AlertList } from "shared/ui/alert";
import { ConfirmDialog } from "shared/ui/confirmDialog";
import ScrollToTop from "shared/lib/react-router/scrollToTop";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import styles from "./root.module.css";

export const Root = () => {
  const location = useLocation();

  return (
    <div className={styles.root}>
      <ScrollToTop />
      <ConfirmDialog />
      <AlertList />
      <Header/>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};
