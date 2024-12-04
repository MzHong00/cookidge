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
  isThumbnaileMode?: boolean;
  isDisabledLike?: boolean;
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
  isDisabledLike = false,
  isThumbnaileMode = false,
  className,
  children,
  ...props
}: Partial<Props>) => {
  return (
    <FramerFadeLayout>
      <article className={`${styles.cardContainer} ${className}`} {...props}>
        {pictures && (
          <PicturesBox
            pictures={pictures}
            isThumbnaileMode={isThumbnaileMode}
          />
        )}
        <div className={styles.containerBottomSection}>
          {!isThumbnaileMode && (
            <Link to={`/recipe/${_id}`}>
              <div className={styles.infoBox}>
                <div className="flex-column">
                  {(name || created_at) && (
                    <div className={styles.infoHeader}>
                      {name && <b>{name}</b>}
                      {created_at && <p>{dateGap(created_at)}전</p>}
                    </div>
                  )}
                  {(cooking_time || servings) && (
                    <div className={styles.subInfo}>
                      {cooking_time !== undefined && (
                        <IconBox Icon={RiTimer2Line}>
                          조리시간 {cooking_time}분
                        </IconBox>
                      )}
                      {servings !== undefined && (
                        <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
                      )}
                    </div>
                  )}

                  {introduction && (
                    <p className={styles.introduction}>{introduction}</p>
                  )}
                </div>
              </div>
            </Link>
          )}
          {like_members && _id && (
            <div className={styles.recipeActionBar}>
              <LikeButton
                recipe_id={_id}
                likeMembers={like_members}
                disabled={isDisabledLike}
              />
            </div>
          )}
          {children}
        </div>
      </article>
    </FramerFadeLayout>
  );
};
