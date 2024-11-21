import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";

import { IRecipe } from "shared/api/recipe";
import { IconBox } from "shared/ui/iconBox";
import { SubjectBox } from "shared/ui/subjectBox";
import { PicturesBox } from "shared/ui/picturesBox";
import { LikeButton } from "features/recipe/like";

import styles from "./detailCard.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement>, IRecipe {}

export const DetailCard = ({
  _id,
  name,
  pictures,
  author_id,
  ingredients,
  introduction,
  servings,
  cooking_time,
  cooking_steps,
  created_at,
  like_members,
  children,
  className,
  ...props
}: Props) => {
  return (
    <article className={`flex-column-center ${className}`} {...props}>
      <PicturesBox pictures={pictures} />
      <div className={styles.infoBox}>
        <div className={styles.recipeInfoBar}>
          <div className={styles.infoHeader}>{name && <b>{name}</b>}</div>
          {like_members && (
            <div className="flex-row">
              {like_members && _id && (
                <LikeButton recipe_id={_id} likeMembers={like_members} />
              )}
            </div>
          )}

          <div className={styles.subInfo}>
            {!!cooking_time && (
              <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
            )}
            {!!servings && <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>}
            {created_at && (
              <IconBox Icon={RiCalendarLine}>
                {`${created_at.toString().substring(0, 10)}`}
              </IconBox>
            )}
          </div>
          {introduction && <p>{introduction}</p>}
        </div>
        {ingredients && (
          <SubjectBox title="재료" className={styles.ingredientBox}>
            <ol>
              {ingredients.map((ingredient) => (
                <li key={ingredient.name}>
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
