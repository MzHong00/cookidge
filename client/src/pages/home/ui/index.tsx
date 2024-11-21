import { useLoaderData } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { RecipeFilterQuery } from "shared/api/recipe";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { RecipeCard } from "widgets/recipeCard";
import { RecipeSearchOption } from "widgets/recipeSearchOption";

import styles from "./index.module.scss";

export const Home = () => {
  const params = useLoaderData() as RecipeFilterQuery;
  const { data: recipes, fetchNextPage, hasNextPage } = useInfiniteQuery(
    RecipeQueries.infinityQuery(params)
  );
  
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <FramerFadeLayout className={styles.cardListContainer}>
      <RecipeSearchOption />

      <div className={styles.recipeList}>
      {recipes?.pages.map((page) =>
        page.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            {...recipe}
            className={styles.homeRecipeCard}
          />
        ))
      )}
      </div>
      <div id="observer" ref={setTarget} style={{ height: "10%" }} />
    </FramerFadeLayout>
  );
};
