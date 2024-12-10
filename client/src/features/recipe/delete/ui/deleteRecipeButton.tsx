import { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { useDeleteRecipeMutation } from "../mutation/deleteRecipeMutation";

import styles from "./deleteRecipeButton.module.css";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  recipeId: IRecipe["_id"];
}

export const DeleteRecipeButton = ({
  recipeId,
  className,
  ...props
}: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync, isPending } = useDeleteRecipeMutation(recipeId);

  const onClicDeleteRecipe = () => {
    if (isPending) return;

    openDialogMessage({
      message: "레시피를 삭제하시겠습니까?",
      requestFn: async () => {
        await mutateAsync();
      },
    });
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
