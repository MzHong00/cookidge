import { RecipeSort } from "features/recipe/sort";
import { RecipeCategory } from "features/recipe/category";

import styles from "./recipeSearchOption.module.css";

interface Props {}

export const RecipeSearchOption = ({}: Props) => {
  return (
    <div className={styles.searchOptionBar}>
      <RecipeCategory />
      <RecipeSort />
    </div>
  );
};
