import { memo } from "react";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

import { IconButton } from "shared/ui/iconButton";
import { FOOD_CATEGORIES } from "entities/recipe";
import { useSlideControl } from "..";
import { useRecipeCategoriesParams } from "..";

import styles from "./recipeCategory.module.scss";

export const RecipeCategory = memo(() => {
  const { categoriesParams, onClickCategories } = useRecipeCategoriesParams();
  const {
    ref,
    isLeftActive,
    isRightActive,
    onClickMoveRight,
    onClickMoveLeft,
  } = useSlideControl();

  return (
    <nav className={styles.categoryBar}>
      <IconButton
        Icon={RiArrowLeftSLine}
        onClick={onClickMoveLeft}
        className={`${!isLeftActive && styles.inActiveButton}`}
      />
      <ul ref={ref} className={styles.category}>
        {FOOD_CATEGORIES.map((category) => (
          <li key={category.text}>
            <IconButton
              onClick={onClickCategories}
              data-category={category.text}
              className={`${
                categoriesParams.includes(category.text) && "main-button"
              }`}
            >
              {category.emoji} {category.text}
            </IconButton>
          </li>
        ))}
      </ul>
      <IconButton
        Icon={RiArrowRightSLine}
        onClick={onClickMoveRight}
        className={`${!isRightActive && styles.inActiveButton}`}
      />
    </nav>
  );
});
