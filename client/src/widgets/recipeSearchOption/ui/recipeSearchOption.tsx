import { RecipeSort } from "features/recipe/sort";
import { RecipeCategory } from "features/recipe/category";

import styles from "./recipeSearchOption.module.css";

export const RecipeSearchOption = () => {
  return (
    <div className={styles.searchOptionBar}>
      <RecipeCategory />
      <RecipeSort />
    </div>
  );
};
