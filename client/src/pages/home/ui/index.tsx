import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { RecipeFilterQuery } from "shared/api/recipe";
import { FadeLayout } from "shared/ui/fadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeCard, RecipeCardSkeleton } from "entities/recipe";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { LikeButton } from "features/recipe/like";
import { RecipeSearchOptionWidget } from "widgets/recipeSearchOption";

import styles from "./index.module.scss";

export const Home = () => {
  const params = useLoaderData() as RecipeFilterQuery;
  const recipeContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: recipes,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(RecipeQueries.infinityQuery(params));

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
    options: { root: recipeContainerRef.current, rootMargin: "800px" },
  });

  return (
    <FadeLayout className={styles.container}>
      <RecipeSearchOptionWidget />

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
                style={{ paddingInline: 0 }}
              />
            </RecipeCard>
          ))
        )}
        {isFetching && (
          <>
            <RecipeCardSkeleton />
            <RecipeCardSkeleton />
          </>
        )}
        <div id="observer" ref={setTarget} style={{ minHeight: "4em" }}></div>
      </div>
    </FadeLayout>
  );
};
