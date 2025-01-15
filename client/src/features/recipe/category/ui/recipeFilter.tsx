import { memo } from "react";
import { RiArrowLeftSLine } from "@react-icons/all-files/ri/RiArrowLeftSLine";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";

import { IconButton } from "shared/ui/iconButton";
import { FOOD_CATEGORIES } from "entities/recipe";
import { useSlideAndShowSideButton, useFilterRecipeParams } from "..";

import styles from "./recipeFilter.module.scss";

export const RecipeFilter = memo(() => {
  const { filterParams, onClickSetFilterParams, onClickRemoveFilterParams } =
    useFilterRecipeParams();
  const {
    ref,
    isLeftActive,
    isRightActive,
    onClickMoveRight,
    onClickMoveLeft,
  } = useSlideAndShowSideButton();

  return (
    <nav className={styles.container}>
      <IconButton
        Icon={RiArrowLeftSLine}
        onClick={onClickMoveLeft}
        className={`${!isLeftActive && styles.inActiveButton}`}
      />

      <ul ref={ref} className={styles.category}>
        <li>
          <IconButton
            onClick={onClickRemoveFilterParams}
            className={`${!filterParams.length && "main-button"}`}
          >
            전체
          </IconButton>
        </li>

        {FOOD_CATEGORIES.map((category) => (
          <li key={category.text}>
            <IconButton
              onClick={onClickSetFilterParams}
              data-category={category.text}
              className={`${
                filterParams.includes(category.text) && "main-button"
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
