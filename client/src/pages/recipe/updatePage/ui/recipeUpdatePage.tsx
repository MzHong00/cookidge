import { useLocation} from "react-router-dom";
import { FormSubmitHandler } from "react-hook-form";

import { useConfirmDialogActions } from "shared/lib/zustand";
import { IRecipeInputDTO, IRecipeJoinUser } from "shared/api/recipe";
import { RecipeForm } from "features/recipe/create";
import { useUpdateRecipeMutation } from "features/recipe/update";

export const RecipeUpdatePage = () => {
  const location = useLocation();
  const { openDialogMessage } = useConfirmDialogActions();

  const { author_id, like_members, created_at, user, ...inputRecipe } =
    location.state as IRecipeJoinUser;

  const { mutateAsync, isPending } = useUpdateRecipeMutation(inputRecipe._id);

  const onSubmit: FormSubmitHandler<IRecipeInputDTO> = async ({
    data: recipe,
  }) => {
    if (isPending) return;

    const formData = new FormData();

    formData.append("name", recipe.name);
    formData.append("introduction", recipe.introduction);
    formData.append("category", recipe.category);
    formData.append("cooking_time", recipe.cooking_time.toString());
    formData.append("servings", recipe.servings.toString());
    formData.append("ingredients", JSON.stringify(recipe.ingredients));

    if (recipe.pictures && recipe.pictures.length > 0) {
      Array.from(recipe.pictures as FileList).forEach((file: File) => {
        formData.append("pictures", file);
      });
    }

    recipe.cooking_steps.forEach((step, index) => {
      formData.append(`cooking_step_instructions`, step.instruction);

      if (step.picture) {
        formData.append(
          `cooking_step_pictures_${index}`,
          typeof step.picture === "string" ? step.picture : step.picture[0]
        );
      }
    });

    openDialogMessage({
      message: `레시피를 업데이트하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync(formData);
      },
    });
  };

  return (
    <RecipeForm
      defalutValues={inputRecipe as IRecipeInputDTO}
      onSubmit={onSubmit}
    />
  );
};
