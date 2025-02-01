import { useLocation } from "react-router-dom";

import { IconLink } from "shared/ui/iconLink";
import { ItemSelectionBox } from "shared/ui/itemSelection";

import styles from "./dashboardSectionSelector.module.scss";

const dashboardTab = {
  fridge: "냉장고",
  recipe: "레시피",
};

export const DashboardSectionSelector = () => {
  const dashboardEndPoint = useLocation().pathname.split("/")[2];

  return (
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
  );
};
