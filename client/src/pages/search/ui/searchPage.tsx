import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { IconButton } from "shared/ui/iconButton";
import { BackspaceButton } from "shared/ui/backspaceButton";
import { FadeLayout } from "shared/ui/fadeLayout";

import styles from "./searchPage.module.scss";

const searchTypes = {
  recipe: "요리",
  user: "사용자",
};

export const SearchPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <FadeLayout className="flex-column">
      <BackspaceButton />
      <div>
        <div className={styles.searchTagetBox}>
          {Array.from(Object.entries(searchTypes)).map(([url, value]) => (
            <IconButton
              key={value}
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
    </FadeLayout>
  );
};
