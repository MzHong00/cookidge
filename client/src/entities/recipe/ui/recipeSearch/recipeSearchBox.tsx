import { useInfiniteQuery } from "@tanstack/react-query";

import { SearchBox } from "shared/ui/searchBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { useParamsDebounce } from "shared/hooks/useParamsDebounce";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeCard, RecipeQueries } from "../..";

import styles from "./recipeSearchBox.module.scss";

export const RecipeSearchBox = () => {
  const { query, value, onChangeRecipeSearch } = useParamsDebounce("q");

  const {
    data: recipePages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(RecipeQueries.infinitySearchQuery({ query: query }));
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <FadeLayout className="flex-column">
      <SearchBox
        value={value}
        placeholder="요리 제목을 입력하세요"
        style={{ padding: "1rem" }}
        onChange={onChangeRecipeSearch}
      />
      <ul className={styles.searchRecipeList}>
        {recipePages?.pages.map((recipes) =>
          recipes?.map((recipe) => (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} className={styles.recipeCard} />
            </li>
          ))
        )}
      </ul>
      <div id="observer" ref={setTarget} />
    </FadeLayout>
  );
};
