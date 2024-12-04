import { RecipeForm } from "features/recipe/create";
import { useCreateRecipeMutation } from "features/recipe/create/mutation/createRecipeMutation";
import { FormSubmitHandler } from "react-hook-form";
import { IRecipeInputDTO } from "shared/api/recipe";

export const RecipeCreatePage = () => {
  const { mutate, isPending } = useCreateRecipeMutation();

  const onSubmit: FormSubmitHandler<IRecipeInputDTO> = async ({ data }) => {
    if (isPending) return;

    mutate({
      ...data,
      cooking_steps: data.cooking_steps.map((step) => ({
        instruction: step.instruction
      })),
      cooking_step_pictures: data.cooking_steps.map(
        (step) => step.picture?.[0]
      ),
    });
  };

  return <RecipeForm onSubmit={onSubmit} />;
};
