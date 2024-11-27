import { IComment } from "shared/api/comment";
import { useDeleteCommentMutation } from "../mutation/deleteCommentMutation";
import { IRecipe } from "shared/api/recipe";

interface Props {
  recipe_id:IRecipe['_id']
  commentId: IComment["_id"];
}

export const DeleteCommentButton = ({ recipe_id, commentId }: Props) => {
  const { mutate } = useDeleteCommentMutation(recipe_id);

  const onClickDeleteComment = () => {
    mutate(commentId);
  };

  return <button onClick={onClickDeleteComment}>삭제</button>;
};
