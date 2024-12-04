import { useLocation, useNavigate } from "react-router-dom";

import { RecipeForm } from "features/recipe/create";
import { IDetailRecipeResponseDTO, IRecipeInputDTO } from "shared/api/recipe";
import { useUpdateRecipeMutation } from "features/recipe/update";
import { FormSubmitHandler } from "react-hook-form";

export const RecipeUpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { author_id, like_members, created_at, user, ...inputRecipe } =
    location.state as IDetailRecipeResponseDTO;
    
  const { mutate, isPending } = useUpdateRecipeMutation(inputRecipe._id);
  
  const onSubmit: FormSubmitHandler<IRecipeInputDTO> = async ({ data: recipe }) => {
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
    
    mutate(formData, {
      onSettled: () => {
        navigate(`/recipe/${recipe._id}`)
      }
    });
  };

  return (
    <RecipeForm
      defalutValues={inputRecipe as IRecipeInputDTO}
      onSubmit={onSubmit}
    />
  );
};
