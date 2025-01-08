import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm } from "shared/api/recipe/type";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage, compressImages } from "shared/lib/imageCompression";
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
        
        // const compressedStepImages = await Promise.all(
        //   data.cooking_steps.map(async ({ instruction, picture }) => ({
        //     instruction: instruction,
        //     picture:
        //       typeof picture === "string"
        //         ? picture
        //         : await compressImage(picture?.[0]),
        //   }))
        // );

        // await mutateAsync({
        //   ...data,
        //   pictures: compressedCookImages,
        //   cooking_steps: compressedStepImages,
        // });
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
