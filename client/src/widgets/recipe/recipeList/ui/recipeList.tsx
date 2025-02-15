import { useRef } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeQueries } from "entities/recipe/queries/recipeQueries";
import { RecipeCard, RecipeCardSkeleton } from "entities/recipe";
import { LikeButton } from "features/recipe/like";
import { useRecipeSearchParams } from "../model/useRecipeSearchParams";

import styles from "./recipeList.module.scss";

export const RecipeList = () => {
  const recipeContainerRef = useRef<HTMLDivElement>(null);
  const recipeParams = useRecipeSearchParams();
  const {
    data: recipes,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery(RecipeQueries.infinityQuery(recipeParams));

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
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
      {isFetching && <RecipeCardSkeleton />}
      <div id="observer" ref={setTarget} style={{ minHeight: "4em" }}></div>
    </div>
  );
};
