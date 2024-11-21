import { useQueryClient } from "@tanstack/react-query";
import { Outlet, useLocation } from "react-router-dom";

import { IconLink } from "shared/ui/iconLink";
import { ItemSelectionBox } from "shared/ui/itemSelection";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { LoginForm } from "features/user/login";

import styles from "./index.module.css";

export const Dashboard = () => {
  const location = useLocation();
  const dashboardEndPoint = location.pathname.split("/")[2];
  const me = useQueryClient().getQueryData([UserQueries.keys.me]);

  const dashboardTab = {
    fridge: "냉장고",
    recipe: "레시피",
  };

  return (
    <FramerFadeLayout className={styles.dashboardPage}>
      {me ? (
        <>
          <ItemSelectionBox>
            {Object.entries(dashboardTab).map((tab) => (
              <IconLink
                key={tab[1]}
                to={`${tab[0]}`}
                className={
                  dashboardEndPoint === tab[0] ? styles.activeTab : undefined
                }
              >
                {tab[1]}
              </IconLink>
            ))}
          </ItemSelectionBox>
          <Outlet />
        </>
      ) : (
        <LoginForm className={styles.loginForm} />
      )}
    </FramerFadeLayout>
  );
};
