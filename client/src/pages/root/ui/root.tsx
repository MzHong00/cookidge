import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ScrollToTop from "shared/lib/react-router/scrollToTop";
import { UserQueries } from "entities/user";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import styles from "./root.module.css";

export const Root = () => {
  const location = useLocation();
  const { data: user } = useQuery(UserQueries.meQuery());

  return (
    <div className={styles.root}>
      <ScrollToTop />
      <Header user={user} />
      <main className={styles.mainContainer}><Outlet /></main>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};
