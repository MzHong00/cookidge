import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { IconBox } from "shared/ui/iconBox";
import { IconLink } from "shared/ui/iconLink";
import { FadeLayout } from "shared/ui/fadeLayout";
import { ProfileImage } from "shared/ui/profileImage";
import { LoadingSpinner } from "shared/ui/loadingSpinner";
import { UserQueries } from "entities/user";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { FollowButton } from "features/user/follow";
import { RecipeGridPictures } from "widgets/recipeGridPictures";

import styles from "./userPage.module.scss";

export const UserPage = () => {
  const { name } = useParams();

  const { data: user, isLoading: isUserLoading } = useQuery(
    UserQueries.userQuery(name)
  );
  const { data: me } = useQuery(UserQueries.meQuery());
  const { data: userRecipes = [], isLoading: isRecipeLoading } = useQuery(
    RecipeQueries.listByUserQuery(name)
  );

  if (isUserLoading) return <LoadingSpinner msg="사용자 정보 가져오는 중..."/>;
  if (!user) return <div>존재하지 않는 사용자입니다.</div>;

  return (
    <FadeLayout className={styles.container}>
      <div className={styles.userInfoContainer}>
        <ProfileImage src={user?.picture} className={styles.profilesPicture} />
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
            {user?._id === me?._id ? (
              <IconLink
                to={"/setting"}
                Icon={RiUserSettingsLine}
                className={`${styles.profileEditButton} ${styles.userActionButton}`}
              >
                프로필 편집
              </IconLink>
            ) : (
              <FollowButton meId={me?._id} user={user} />
            )}
          </div>
        </div>
      </div>

      <div className={`flex-column-center ${styles.userRecipeContainer}`}>
        <header>
          <h2>레시피</h2>
        </header>
        <hr />
        <RecipeGridPictures isLoading={isRecipeLoading} recipes={userRecipes} />
      </div>
    </FadeLayout>
  );
};
