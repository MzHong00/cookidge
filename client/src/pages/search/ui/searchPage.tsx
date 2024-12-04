import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";

import { IconButton } from "shared/ui/iconButton";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./searchPage.module.scss";

const searchTypes = {
  recipe: "요리",
  user: "사용자",
};

export const SearchPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <FramerFadeLayout className="flex-column">
      <nav>
        <IconButton
          Icon={RiArrowLeftSLine}
          className={styles.navArrow}
          onClick={() => {
            navigate(-1);
          }}
        />
      </nav>
      <div>
        <div className={styles.searchTagetBox}>
          {Array.from(Object.entries(searchTypes)).map(([url, value]) => (
            <IconButton
              className={`${pathname.includes(url) && "main-button"}`}
              onClick={() => {
                navigate(`/search/${url}`, {replace: true});
              }}
            >
              {value}
            </IconButton>
          ))}
        </div>
      </div>
      <Outlet />
    </FramerFadeLayout>
  );
};
