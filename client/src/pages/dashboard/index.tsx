import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

import { IconLink } from "shared/ui/iconLink";
import { ItemSelectionBox } from "shared/ui/itemSelection";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { LoginForm } from "features/user/login";

import styles from "./index.module.css";

export const Dashboard = () => {
  const dashboardEndPoint = useLocation().pathname.split("/")[2];
  const { data: user, isLoading } = useQuery(UserQueries.meQuery());

  const dashboardTab = {
    fridge: "냉장고",
    recipe: "레시피",
  };

  if(isLoading) return <div>사용자 가져오는 중...</div>
  if (!user) return <LoginForm className={styles.loginForm} />;

  return (
    <FramerFadeLayout className={styles.dashboardPage}>
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
    </FramerFadeLayout>
  );
};
