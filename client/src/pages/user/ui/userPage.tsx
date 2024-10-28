import { Link, useLoaderData } from "react-router-dom";
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine";
import { RiUserFollowLine } from "@react-icons/all-files/ri/RiUserFollowLine";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { User } from "shared/types";
import { IconButton } from "shared/ui/iconButton";
import { IconLink } from "shared/ui/iconLink";
import { IconBox } from "shared/ui/iconBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useGlobalStore } from "shared/lib/zustand/useStore";
import { RecipeCard } from "widgets/recipeCard";

import styles from "./userPage.module.scss";

export const UserPage = () => {
  const user = useLoaderData() as User;
  const me = useGlobalStore((state) => state.user);

  if (!user) return <div>존재하지 않는 사용자입니다.</div>;

  return (
    <FramerFadeLayout className="w-full flex-column-center">
      <div className={styles.userInfoContainer}>
        <img src={user?.picture} className={styles.profilesPicture} alt="" />
        <div className={styles.userInfo}>
          <h2>{user?.name}</h2>
          <span className={styles.introduceText}>{user?.email}</span>
          <p>{user?.introduce}</p>
        </div>

        <div className="flex-column-center">
          <div>
            <IconBox className={styles.followBox}>
              <b>팔로우 </b>
              <span>{user?.follower.length}</span>
            </IconBox>
            <IconBox className={styles.followBox}>
              <b>팔로잉 </b>
              <span>{user?.following.length}</span>
            </IconBox>
          </div>
          <div className="flex-row">
            {user._id === me?._id ? (
              <IconLink
                to={"/setting"}
                Icon={RiUserSettingsLine}
                className={`${styles.profileEditButton} ${styles.userActionButton}`}
              >
                프로필 편집
              </IconLink>
            ) : (
              <>
                <IconButton
                  Icon={RiUserAddLine}
                  className={styles.userActionButton}
                >
                  팔로우
                </IconButton>
                <IconButton
                  Icon={RiUserFollowLine}
                  className={styles.userActionButton}
                >
                  팔로우 해제
                </IconButton>
              </>
            )}
          </div>
        </div>
      </div>

      <div className={`flex-column-center ${styles.userRecipeContainer}`}>
        <header>
          <h2>레시피</h2>
        </header>
        <hr />
        <div className={styles.userRecipeList}>
          <Link to={"/recipe/1"}>
            <RecipeCard
              name="김치볶음밥"
              className={styles.userRecipeCard}
              like_members={["", ""]}
            />
          </Link>
          <Link to={"/recipe/1"}>
            <RecipeCard
              name="김치볶음밥"
              className={styles.userRecipeCard}
              like_members={["", ""]}
            />
          </Link>
          <Link to={"/recipe/1"}>
            <RecipeCard
              name="김치볶음밥"
              className={styles.userRecipeCard}
              like_members={["", ""]}
            />
          </Link>
        </div>
      </div>
    </FramerFadeLayout>
  );
};
