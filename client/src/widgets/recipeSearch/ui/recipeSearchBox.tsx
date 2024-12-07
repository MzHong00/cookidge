import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { SearchBox } from "shared/ui/searchBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeCard, RecipeQueries } from "entities/recipe";
import { useParamsDebounce } from "../model/useParamsDebounce";

import styles from "./recipeSearchBox.module.scss";

export const RecipeSearchBox = () => {
  const [searchParams] = useSearchParams();
  const { value, onChangeRecipeSearch } = useParamsDebounce();

  const {
    data: recipePages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    RecipeQueries.infinitySearchQuery({ query: searchParams.get("q") || "" })
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <div className={styles.container}>
      <SearchBox
        value={value}
        placeholder="요리 제목을 입력하세요"
        className={styles.searchInput}
        onChange={onChangeRecipeSearch}
      />

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
