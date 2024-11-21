import { Link } from "react-router-dom";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";

import { IRecipe } from "shared/api/recipe";
import { IconBox } from "shared/ui/iconBox";
import { dateGap } from "shared/helper/dateGap";
import { PicturesBox } from "shared/ui/picturesBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { LikeButton } from "features/recipe/like";

import styles from "./recipeCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement>, IRecipe {
  isShowNavigation?: boolean;
}

export const RecipeCard = ({
  _id,
  name,
  pictures,
  author_id,
  introduction,
  servings,
  cooking_time,
  created_at,
  like_members,
  isShowNavigation,
  className,
  children,
  ...props
}: Partial<Props>) => {
  console.log(_id);

  return (
    <article className={`${styles.cardContainer} ${className}`} {...props}>
      <FramerFadeLayout>
        {pictures && (
          <PicturesBox
            pictures={pictures}
            isShowNavigation={isShowNavigation}
          />
        )}
        <div className={styles.infoBox}>
          <div className="flex-column">
            <Link to={`recipe/${_id}`} className={styles.infoHeader}>
              {name && <b>{name}</b>}
              {created_at && <p>{dateGap(created_at)}전</p>}
            </Link>
            {(cooking_time || servings) && (
              <div className={styles.subInfo}>
                {cooking_time && (
                  <IconBox Icon={RiTimer2Line}>
                    조리시간 {cooking_time}분
                  </IconBox>
                )}
                {servings && (
                  <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
                )}
              </div>
            )}

            {introduction && (
              <p className={styles.introduction}>{introduction}</p>
            )}
          </div>

          {like_members && _id && (
            <div className={styles.recipeActionBar}>
              <LikeButton recipe_id={_id} likeMembers={like_members} />
            </div>
          )}
        </div>
      </FramerFadeLayout>
    </article>
  );
};
