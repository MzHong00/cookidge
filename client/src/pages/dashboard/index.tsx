import { Outlet } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { FadeLayout } from "shared/ui/fadeLayout";
import { UserQueries } from "entities/user";
import { LoginForm } from "features/user/login";
import { DashboardSectionSelector } from "widgets/dashboardSectionSelector";

import styles from "./index.module.scss";

export const Dashboard = () => {
  const { data: user } = useSuspenseQuery(UserQueries.meQuery());

  if (!user) return <LoginForm />;

  return (
    <FadeLayout className={styles.dashboardPage}>
      <DashboardSectionSelector />
      <Outlet />
    </FadeLayout>
  );
};
