import { Outlet, useLocation } from "react-router-dom";

import { IconLink } from "shared/ui/iconLink";
import { ItemSelectionBox } from "shared/ui/itemSelectionBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./index.module.css";

export const Dashboard = () => {
  const location = useLocation();

  const dashboardEndPoint = location.pathname.split("/")[2];

  const dashboardTab = {
    fridge: "냉장고",
    recipe: "레시피",
  };

  return (
    <FramerFadeLayout className={styles.dashboardPage}>
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
    </FramerFadeLayout>
  );
};
