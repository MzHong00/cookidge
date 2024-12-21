import { SubmitHandler } from "react-hook-form";

import { IRecipeForm } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { RecipeForm, useCreateRecipeMutation } from "../..";

export const CreateRecipeForm = () => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useCreateRecipeMutation();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync({
          ...data,
          cooking_steps: data.cooking_steps.map((step) => ({
            instruction: step.instruction,
            picture:
              typeof step.picture === "string" ? step.picture : step.picture?.[0],
          })),
        });
      },
    });
  };

  return <RecipeForm onSubmit={onSubmit} submitTitle="레시피 생성" />;
};
