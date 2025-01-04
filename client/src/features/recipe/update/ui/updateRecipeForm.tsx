import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm } from "shared/api/recipe/type";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { RecipeForm } from "features/recipe/create";
import { useUpdateRecipeMutation } from "..";

interface Props {
  defalutValues: IRecipeForm;
}

export const UpdateRecipeForm = ({ defalutValues }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useUpdateRecipeMutation(defalutValues._id);

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `레시피를 업데이트하시겠습니까?`,
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

  return (
    <RecipeForm
      submitTitle="레시피 업데이트"
      defalutValues={defalutValues}
      onSubmit={onSubmit}
    />
  );
};
