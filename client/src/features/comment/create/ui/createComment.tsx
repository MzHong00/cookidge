import { useState } from "react";

import type { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { useCreateCommentMutation } from "../mutation/createCommentMutation";

import styles from "./createComment.module.scss";

interface Props {
  recipeId: IRecipe["_id"];
}

export const CreateComment = ({ recipeId }: Props) => {

  const [comment, setComment] = useState<string>("");
  const { mutate } = useCreateCommentMutation(recipeId);

  const onClickCreateComment = () => {
    mutate(comment);
    setComment("");
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
