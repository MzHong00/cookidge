import { useState } from "react";

import { IRecipe } from "shared/api/recipe";
import { ICommentDTO } from "shared/api/comment/type";
import { IconButton } from "shared/ui/iconButton";
import { useCreateCommentMutation } from "../mutation/createCommentMutation";

import styles from "./createComment.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { UserQueries } from "entities/user";
import { IUser } from "shared/api/user";

interface Props {
  recipeId: IRecipe["_id"];
  setNewTempComments: React.Dispatch<React.SetStateAction<ICommentDTO[]>>;
}

export const CreateComment = ({ recipeId, setNewTempComments }: Props) => {
  const queryClient = useQueryClient();

  const [comment, setComment] = useState<string>("");
  const { mutate } = useCreateCommentMutation(recipeId);
  const me = queryClient.getQueryData([UserQueries.keys.me]) as IUser;

  const onClickCreateComment = () => {
    mutate(comment, {
      onSuccess: (data) => {
        setNewTempComments((prev) => [
          {
            ...data,
            user: [
              {
                _id: me._id,
                name: me.name,
                picture: me.picture,
              },
            ],
          },
          ...prev,
        ]);
      },
    });
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
