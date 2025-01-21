import { RecipeSort } from "features/recipe/sort";
import { RecipeFilter } from "features/recipe/category";

import styles from "./recipeSearchOption.module.scss";

export const RecipeSearchOption = () => {
  return (
    <div className={styles.searchOptionBar}>
      <RecipeFilter />
      <RecipeSort />
    </div>
  );
};
