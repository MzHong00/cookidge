import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { IRecipe } from "shared/api/recipe";
import { SubjectBox } from "shared/ui/subjectBox";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { Comment, CommentQueries } from "entities/comment";
import { CreateComment } from "features/comment/create";

export const CommentWidget = ({ recipe_id }: {
  recipe_id: IRecipe["_id"];
}) => {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    CommentQueries.infiniteQuery({ recipeId: recipe_id, limit: 10 })
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });
  
  return (
    <SubjectBox title="댓글" style={{ border: "none" }}>
      <CreateComment recipeId={recipe_id} />
      <div className="flex-column">
        {data?.pages.map((page) =>
          page.map((comment) => (
            <Comment key={comment._id} commentData={comment} />
          ))
        )}
        <div id="observer" ref={setTarget} style={{ height: "10%" }} />
      </div>
    </SubjectBox>
  );
};
