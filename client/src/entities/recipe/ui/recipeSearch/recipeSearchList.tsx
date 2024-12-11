import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeCard, RecipeQueries } from "entities/recipe";

import styles from "./recipeSearchBox.module.scss";

export const RecipeSearchList = () => {
  const [searchParams] = useSearchParams();
  
  const {
    data: recipePages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    RecipeQueries.infinitySearchQuery({ query: searchParams.get("q") || "" })
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div>
      <FramerFadeLayout>
        <ul className={styles.searchRecipeList}>
          {recipePages?.pages.map((recipes) =>
            recipes?.map((recipe) => (
              <li key={recipe._id}>
                <RecipeCard recipe={recipe} className={styles.recipeCard} />
              </li>
            ))
          )}
        </ul>
      </FramerFadeLayout>
      <div id="observer" ref={setTarget} />
    </div>
  );
};
