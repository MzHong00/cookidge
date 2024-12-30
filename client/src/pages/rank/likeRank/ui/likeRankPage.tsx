import { useInfiniteQuery } from "@tanstack/react-query";

import { RankItem } from "shared/ui/rankItem";
import { SubjectBox } from "shared/ui/subjectBox";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { RecipeQueries } from "entities/recipe";
import { LikeButton } from "features/recipe/like";

import styles from './likeRankPage.module.scss'

export const LikeRankPage = () => {
  const {
    data: recipes,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    RecipeQueries.infinityQuery({ limit: 10, sort: "like" })
  );
  const { setTarget } = useIntersectionObserver({
    options: { rootMargin: "300px" },
    hasNextPage,
    fetchNextPage,
  });

  return (
    <SubjectBox title="좋아요가 많은 레시피" className={styles.container}>
      {recipes?.pages.map((page, pageIndex) =>
        page.map((recipe, index) => (
          <RankItem
            key={recipe._id}
            to={`/recipe/${recipe._id}`}
            picture={recipe.pictures[0]}
            title={recipe.name}
            rank={index + pageIndex}
          >
            <LikeButton
              recipe_id={recipe._id}
              likeMembers={recipe.like_members}
              disabled
            />
          </RankItem>
        ))
      )}
      <div id="observer" ref={setTarget} style={{ minHeight: "4em" }}></div>
    </SubjectBox>
  );
};
