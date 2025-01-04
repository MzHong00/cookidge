import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiCalendarLine } from "@react-icons/all-files/ri/RiCalendarLine";

import type { IRecipe } from "shared/api/recipe/type";
import { IconBox } from "shared/ui/iconBox";
import { PicturesBox } from "shared/ui/picturesBox";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";
import { LikeButton } from "features/recipe/like";

import styles from "./recipeDetailWidget.module.scss";

interface Props {
  recipe: IRecipe;
}

export const RecipeDetailWidget = ({ recipe, ...props }: Props) => {
  const {
    _id,
    name,
    pictures,
    ingredients,
    introduction,
    servings,
    cooking_time,
    created_at,
    like_members,
  } = recipe;

  return (
    <article className={styles.container} {...props}>
      <PicturesBox pictures={pictures} />

      <div className={styles.infoBox}>
        <div className={styles.recipeInfoBar}>
          <div className={styles.infoHeader}>
            <h4>{name}</h4>
          </div>

          <div className="flex-row">
            <LikeButton recipe_id={_id} likeMembers={like_members} />
          </div>

          <div className={styles.subInfo}>
            <IconBox Icon={RiTimer2Line}>조리시간 {cooking_time}분</IconBox>
            <IconBox Icon={RiGroupLine}>{servings}인분</IconBox>
            <IconBox Icon={RiCalendarLine}>
              {`${created_at.toString().substring(0, 10)}`}
            </IconBox>
          </div>
          <p>{introduction}</p>
        </div>
        <ul className={styles.ingredientList}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.name} className={styles.ingredient}>
              {
                INGREDIENTS_CATEGORIES.find(
                  (cate) => cate.text === ingredient.category
                )?.emoji
              }
              {ingredient.name} {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
