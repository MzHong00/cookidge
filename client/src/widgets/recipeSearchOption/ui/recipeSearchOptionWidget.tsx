import { RecipeSort } from "features/recipe/sort";
import { RecipeCategory } from "features/recipe/category";

import styles from "./recipeSearchOptionWidget.module.scss";

export const RecipeSearchOptionWidget = () => {
  return (
    <div className={styles.searchOptionBar}>
      <RecipeCategory />
      <RecipeSort />
    </div>
  );
};
