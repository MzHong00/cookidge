import type { IRecipe } from "shared/api/recipe";
import { IconButton } from "shared/ui/iconButton";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";

import { useDeleteRecipeMutation } from "../mutation/deleteRecipeMutation";

import styles from "./deleteRecipeButton.module.css";

interface Props {
  recipeId: IRecipe["_id"];
}

export const DeleteRecipeButton = ({ recipeId }: Props) => {
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
      className={`${styles.deleteButton}`}
      onClick={onClicDeleteRecipe}
    >
      삭제
    </IconButton>
  );
};
