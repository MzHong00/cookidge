import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";

import { type Recipe } from "shared/types";
import { IconBox } from "shared/ui/iconBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { CloudinaryImg } from "shared/ui/cloudinary";
import { LikeButton, RattingButton } from "features/recipe";

import styles from "./detailCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement>, Recipe {
  onClickLike: React.MouseEventHandler;
  onClickStar: React.MouseEventHandler;
}

export const DetailCard = ({
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
  children,
  className,
  ...props
}: Partial<Props>) => {
  return (
    <article className={`flex-column ${className}`} {...props}>
      <CloudinaryImg
        publicId="shish-kebab-417994_640_db1899"
        className={styles.pictureBox}
      />
      <div className={styles.infoBox}>
        <div className={styles.recipeInfoBar}>
          <div className={styles.infoHeader}>{name && <b>{name}</b>}</div>
          {(like_members || onClickStar) && (
            <div className="flex-row">
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

          <div className={styles.subInfo}>
            {cooking_time && (
              <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
            )}
            {servings && <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>}
            {created_at && (
              <IconBox Icon={RiCalendarLine}>
                {created_at.toLocaleDateString()}
              </IconBox>
            )}
          </div>
          {introduction && <p>{introduction}</p>}
        </div>
        {ingredients && (
          <SubjectBox title="재료" className={styles.ingredientBox}>
            <ol>
              {ingredients.map((ingredient) => (
                <li key={ingredient._id}>
                  {ingredient.name} {ingredient.quantity}
                </li>
              ))}
            </ol>
          </SubjectBox>
        )}
      </div>
    </article>
  );
};
