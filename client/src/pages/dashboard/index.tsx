import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

import { IconLink } from "shared/ui/iconLink";
import { FadeLayout } from "shared/ui/fadeLayout";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { ItemSelectionBox } from "shared/ui/itemSelection";
import { UserQueries } from "entities/user";
import { LoginForm } from "features/user/login";

import styles from "./index.module.scss";

export const Dashboard = () => {
  const dashboardEndPoint = useLocation().pathname.split("/")[2];
  const { data: user, isLoading } = useQuery(UserQueries.meQuery());

  const dashboardTab = {
    fridge: "냉장고",
    recipe: "레시피",
  };

  if(isLoading) return <LoadingSpinner msg="사용자 가져오는 중..."/>
  if (!user) return <LoginForm className={styles.loginForm} />;

  return (
    <FadeLayout className={styles.dashboardPage}>
      <ItemSelectionBox>
        {Object.entries(dashboardTab).map(([url, text]) => (
          <IconLink
            key={url}
            to={`${url}`}
            className={`${dashboardEndPoint === url && styles.activeTab}`}
          >
            {text}
          </IconLink>
        ))}
      </ItemSelectionBox>
      <Outlet />
    </FadeLayout>
  );
};
