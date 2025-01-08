import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage, compressImages } from "shared/lib/imageCompression";
import { RecipeForm, useCreateRecipeMutation } from "../..";

export const CreateRecipeForm = () => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useCreateRecipeMutation();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        const compressedCookImages = (await compressImages(
          data.pictures
        )) as IRecipeForm["pictures"];

        const stepImages = data.cooking_steps.map(
          ({ instruction, picture }) => typeof picture === "string"
          ? picture
          : picture?.[0] || "",
        );

        const compressedStepImages = await compressImages(stepImages);
        console.log("압축됨:",compressedCookImages);
        console.log("압축됨:",compressedStepImages);
        

        // await mutateAsync({
        //   ...data,
        //   pictures: compressedCookImages,
        //   cooking_steps: compressedStepImages,
        // });
      },
    });
  };

  return <RecipeForm onSubmit={onSubmit} submitTitle="레시피 생성" />;
};
