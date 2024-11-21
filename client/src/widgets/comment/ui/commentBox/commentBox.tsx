import { IRecipe } from "shared/api/recipe";
import { SubjectBox } from "shared/ui/subjectBox";
import { CreateComment } from "features/chat/create";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentQueries } from "entities/comment";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { Comment } from "../comment/comment";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  recipe_id: IRecipe["_id"];
}

export const CommentBox = ({ recipe_id, ...props }: Props) => {
  const { data, fetchNextPage, hasNextPage} = useInfiniteQuery(CommentQueries.infiniteQuery(recipe_id));
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <SubjectBox title="댓글" {...props}>
      <CreateComment recipeId={recipe_id} />
      
      <div className="flex-column">
      {data?.pages.map((page) =>
        page.map((comment) => (
          <Comment
            key={comment._id}
            {...comment}
          />
        ))
      )}
      <div id="observer" ref={setTarget} style={{ height: "10%" }} />

      </div>
    </SubjectBox>
  );
};
