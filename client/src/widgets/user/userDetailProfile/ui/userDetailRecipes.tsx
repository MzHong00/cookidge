import { useSuspenseQuery } from "@tanstack/react-query";

import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { RecipeGridPictures } from "shared/ui/recipeGridPictures";

import styles from "./userDetailProfile.module.scss";

export const UserDetailRecipes = ({ name }: { name?: string }) => {
  const { data: userRecipes = [] } = useSuspenseQuery(
    RecipeQueries.listByUserQuery(name)
  );

  return (
    <div className={styles.usersRecipes}>
      <h2>레시피</h2>
      <hr />
      <RecipeGridPictures recipes={userRecipes} />
    </div>
  );
};
