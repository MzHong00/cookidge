import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { SearchBox } from "shared/ui/searchBox";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeQueries } from "entities/recipe";
import { RecipeCard } from "widgets/recipeCard";
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
          recipes?.map(({ user, ...recipe }) => (
            <li key={recipe._id}>
              <RecipeCard
                className={styles.recipeCard}
                isDisabledLike
                {...recipe}
              />
            </li>
          ))
        )}
      </ul>
      </FramerFadeLayout>
      <div id="observer" ref={setTarget} />
    </div>
  );
};
