import { useNavigate } from "react-router-dom";

import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { useDeleteRecipeMutation } from "../mutation/deleteRecipeMutation";

import styles from "./deleteRecipeButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  recipeId: IRecipe["_id"];
}

export const DeleteRecipeButton = ({
  recipeId,
  className,
  ...props
}: Props) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteRecipeMutation(recipeId);

  const onClicDeleteRecipe = () => {
    if (isPending) return;

    mutate(undefined, {onSuccess: () => {
      navigate(-1)
    }});
  };

  return (
    <IconButton
      className={`${styles.deleteButton} ${className}`}
      onClick={onClicDeleteRecipe}
      {...props}
    >
      삭제
    </IconButton>
  );
};
