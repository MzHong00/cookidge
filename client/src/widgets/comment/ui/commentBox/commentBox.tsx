import { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

import { IRecipe } from "shared/api/recipe";
import { SubjectBox } from "shared/ui/subjectBox";
import { ICommentDTO } from "shared/api/comment/type";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { CommentQueries } from "entities/comment";
import { CreateComment } from "features/comment/create";
import { Comment } from "../comment/comment";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  recipe_id: IRecipe["_id"];
}

export const CommentBox = ({ recipe_id, ...props }: Props) => {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    CommentQueries.infiniteQuery(recipe_id)
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });
  const [newTempComments, setNewTempComments] = useState<ICommentDTO[]>([]);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({queryKey: [CommentQueries.keys.comment, recipe_id]})
    }
  }, [queryClient, recipe_id])

  return (
    <SubjectBox title="댓글" {...props}>
      <CreateComment
        recipeId={recipe_id}
        setNewTempComments={setNewTempComments}
      />

      <div className="flex-column">
        {newTempComments.map((comment) => (
          <Comment
            key={`${comment._id}`}
            {...comment}
          />
        ))}
        {data?.pages.map((page) =>
          page.map((comment) => <Comment key={comment._id} {...comment} />)
        )}
        <div id="observer" ref={setTarget} style={{ height: "10%" }} />
      </div>
    </SubjectBox>
  );
};
