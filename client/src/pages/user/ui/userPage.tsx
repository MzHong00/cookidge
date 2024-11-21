import { Link, useLoaderData } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine";
import { RiUserFollowLine } from "@react-icons/all-files/ri/RiUserFollowLine";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { IUser } from "shared/api/user";
import { IconBox } from "shared/ui/iconBox";
import { IconLink } from "shared/ui/iconLink";
import { IconButton } from "shared/ui/iconButton";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { RecipeCard } from "widgets/recipeCard";

import styles from "./userPage.module.scss";

export const UserPage = () => {
  const user = useLoaderData() as IUser;
  const me = useQueryClient().getQueryData([UserQueries.keys.me]) as IUser;
  const { data: userRecipes, isLoading } = useQuery(
    RecipeQueries.listByUserQuery(user.name)
  );

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
          {userRecipes?.map((recipe) => (
            <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
              <RecipeCard
                key={recipe._id}
                className={styles.userRecipeCard}
                {...recipe}
              />
            </Link>
          ))}
        </div>
      </div>
    </FramerFadeLayout>
  );
};
