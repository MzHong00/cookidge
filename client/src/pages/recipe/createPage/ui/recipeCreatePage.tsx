import { FormSubmitHandler } from "react-hook-form";

import { IRecipeInputDTO } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { RecipeForm } from "features/recipe/create";
import { useCreateRecipeMutation } from "features/recipe/create/mutation/createRecipeMutation";

export const RecipeCreatePage = () => {
  const { mutateAsync, isPending } = useCreateRecipeMutation();
  const { openDialogMessage } = useConfirmDialogActions();

  const onSubmit: FormSubmitHandler<IRecipeInputDTO> = async ({ data }) => {
    if (isPending) return;

    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync({
          ...data,
          cooking_steps: data.cooking_steps.map((step) => ({
            instruction: step.instruction
          })),
          cooking_step_pictures: data.cooking_steps.map(
            (step) => step.picture?.[0]
          ),
        });
      }
    })
  };

  return <RecipeForm onSubmit={onSubmit} />;
};
