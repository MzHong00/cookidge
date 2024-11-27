import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ScrollToTop from "shared/lib/react-router/scrollToTop";
import { UserQueries } from "entities/user";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import styles from "./root.module.css";

export const Root = () => {
  const { data: user, isLoading } = useQuery(UserQueries.meQuery());
  const location = useLocation();

  return (
    <div className={styles.root}>
      <ScrollToTop />
      <Header user={user} />
      <main className={styles.mainContainer}>{!isLoading && <Outlet />}</main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};
