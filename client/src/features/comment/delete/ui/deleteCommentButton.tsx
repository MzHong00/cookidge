import { IComment } from "shared/api/comment";
import { useDeleteCommentMutation } from "../mutation/deleteCommentMutation";
import { IRecipe } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/lib/zustand";

interface Props {
  recipe_id: IRecipe["_id"];
  author_id: IRecipe['author_id'];
  comment_id: IComment["_id"];
}

export const DeleteCommentButton = ({ comment_id, recipe_id, author_id }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useDeleteCommentMutation(recipe_id, author_id);

  const onClickDeleteComment = () => {
    openDialogMessage({
      message: "댓글을 삭제하시겠습니까?",
      requestFn: async () => {
        await mutateAsync(comment_id);
      },
      option: { backspace: false },
    });
  };

  return <button onClick={onClickDeleteComment}>삭제</button>;
};
