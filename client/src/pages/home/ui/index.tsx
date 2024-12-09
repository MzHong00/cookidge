import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { RecipeFilterQuery } from "shared/api/recipe";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeCard } from "entities/recipe";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { LikeButton } from "features/recipe/like";
import { RecipeSearchOption } from "widgets/recipeSearchOption";

import styles from "./index.module.scss";

export const Home = () => {
  const params = useLoaderData() as RecipeFilterQuery;
  const recipeContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: recipes,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(RecipeQueries.infinityQuery(params));

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
    options: { root: recipeContainerRef.current, rootMargin: "800px" },
  });

  return (
    <FramerFadeLayout className={styles.container}>
      <RecipeSearchOption />

      <div ref={recipeContainerRef} className={styles.recipeList}>
        {recipes?.pages.map((page) =>
          page.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              className={styles.homeRecipeCard}
            >
              <LikeButton
                recipe_id={recipe._id}
                likeMembers={recipe.like_members}
              />
            </RecipeCard>
          ))
        )}
        <p id="observer" ref={setTarget} style={{ height: "10%" }}></p>
      </div>
    </FramerFadeLayout>
  );
};
