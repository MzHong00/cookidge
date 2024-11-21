import { IconButton } from "shared/ui/iconButton";
import { IRecipe } from "shared/api/recipe";
import { useCreateCommentMutation } from "../mutation/createCommentMutation";

import styles from "./createComment.module.scss";
import { useState } from "react";

interface Props {
  recipeId: IRecipe["_id"];
}

export const CreateComment = ({ recipeId }: Props) => {
  const { mutate } = useCreateCommentMutation(recipeId);
  const [comment, setComment] = useState<string>("");

  const onClickCreateComment = () => {
    mutate(comment);
  };

  return (
    <div className={styles.container}>
      <textarea
        value={comment}
        placeholder="댓글을 입력하세요"
        className={styles.textArea}
        onChange={(e) => setComment(e.target.value)}
        minLength={1}
        maxLength={100}
      />
      <IconButton className="main-button" onClick={onClickCreateComment}>
        입력
      </IconButton>
    </div>
  );
};
