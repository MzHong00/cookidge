import { Link } from "react-router-dom";
import { RiUserAddLine } from "@react-icons/all-files/ri/RiUserAddLine";
import { RiUserFollowLine } from "@react-icons/all-files/ri/RiUserFollowLine";
import { RiUserSettingsLine } from "@react-icons/all-files/ri/RiUserSettingsLine";

import { IconButton } from "shared/ui/iconButton";
import { IconLink } from "shared/ui/iconLink";
import { IconBox } from "shared/ui/iconBox";
import { RecipeCard } from "widgets/recipeCard";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";

import styles from "./userPage.module.css";

export const UserPage = () => {
  return (
    <FramerFadeLayout className={styles.userPage}>
      <div className={styles.userInfoContainer}>
        <IconButton
          src="https://lh3.googleusercontent.com/a/AEdFTp4pPqM6NpOpPqG-cAg1vMo6k6PwFlei8v1deyEJ=s96-c"
          className={styles.profilesPicture}
        />
        <div className={styles.userInfoBox}>
          <div className={styles.nameBox}>
            <b>홍길동</b>
            <span> #홍길동123</span>
          </div>
          <p>
            안녕하세요 저는 홍길동입니다.안녕하세요 저는 홍길동입니다.안녕하세요
            저는 홍길동입니다.안녕하세요 저는 홍길동입니다.
          </p>
        </div>

        <div className={styles.communityBox}>
          <div>
            <IconBox className={styles.followBox}>
              <b>팔로우</b>
              <span>1.1k</span>
            </IconBox>
            <IconBox className={styles.followBox}>
              <b>팔로잉</b>
              <span>1.1k</span>
            </IconBox>
          </div>
          <div className={styles.userActionBar}>
            <IconLink
              to={"setting"}
              Icon={RiUserSettingsLine}
              className={`${styles.profileEditButton} ${styles.userActionButton}`}
            >
              프로필 편집
            </IconLink>
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
          </div>
        </div>
      </div>

      <div className={styles.userRecipeContainer}>
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
        </div>
      </div>
    </FramerFadeLayout>
  );
};
