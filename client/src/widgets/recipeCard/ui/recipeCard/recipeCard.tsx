import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

import { type Recipe } from "shared/types";
import { IconLink } from "shared/ui/iconLink";
import { IconBox } from "shared/ui/iconBox";
import { CloudinaryImg } from "shared/ui/cloudinary";
import { dateGap } from "shared/helper/dateGap";
import { LikeButton, RattingButton } from "features/recipe";

import styles from "./recipeCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Recipe {
  onClickLike: React.MouseEventHandler;
  onClickStar: React.MouseEventHandler;
  isActiveDetailLink: boolean;
}

export const RecipeCard = ({
  _id,
  name,
  picture,
  author_id,
  ingredients,
  introduction,
  servings,
  cooking_time,
  cooking_steps,
  created_at,
  like_members,
  ratting,
  onClickLike,
  onClickStar,
  isActiveDetailLink = false,
  children,
  className,
  ...props
}: Partial<Props>) => {
  return (
    <article className={`${styles.cardContainer} ${className}`} {...props}>
      <CloudinaryImg
        publicId="shish-kebab-417994_640_db1899"
        className={styles.pictureBox}
      />

      <div className={styles.infoBox}>
        <div className="flex-column">
          <div className={styles.infoHeader}>
            {name && <b>{name}</b>}
            {created_at && <p>{`${dateGap(created_at)}전`}</p>}
          </div>
          {(cooking_time || servings) && (
            <div className={styles.subInfo}>
              {cooking_time && (
                <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}</IconBox>
              )}
              {servings && <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>}
            </div>
          )}

          {introduction && (
              <p className={styles.introduction}>{introduction}</p>
          )}
        </div>
        {ingredients && (
          <div className={styles.ingredientBox}>
            <h4>재료</h4>
            {ingredients.map((ingredient) => (
              <span key={ingredient._id}>
                {ingredient.name} {ingredient.quantity},{" "}
              </span>
            ))}
          </div>
        )}

        {(like_members || onClickStar) && (
          <div className={styles.recipeActionBar}>
            {like_members && (
              <LikeButton
                likeCount={like_members.length}
                onClick={onClickLike}
              />
            )}
            {ratting && (
              <RattingButton rattingCount={ratting} onClick={onClickStar} />
            )}
          </div>
        )}

        {isActiveDetailLink && (
          <IconLink
            to={`recipe/${_id}`}
            Icon={RiArrowRightSLine}
            className={styles.recipeDetailButton}
          >
            자세히 보기
          </IconLink>
        )}
      </div>
    </article>
  );
};
