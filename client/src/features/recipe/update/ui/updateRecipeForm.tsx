import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm } from "shared/api/recipe/type";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { RecipeForm } from "features/recipe/create";
import { useUpdateRecipeMutation } from "..";
import imageCompression from "browser-image-compression";

interface Props {
  defalutValues: IRecipeForm;
}

export const UpdateRecipeForm = ({ defalutValues }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useUpdateRecipeMutation(defalutValues._id);

  const options = {
    maxSizeMB: 0.1,
    useWebWorker: true,
  };

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    const { pictures } = data;
    console.log(pictures);

    const getImgUpload = async (image: File) => {
      const resizingBlob = await imageCompression(image,options);
      return resizingBlob;
    };

    const a = (pictures && await Promise.all(Array.from(pictures as FileList).map((file) => getImgUpload(file) )))
    
    openDialogMessage({
      message: `레시피를 업데이트하시겠습니까?`,
      requestFn: async () => {
        await mutateAsync({
          ...data,
          pictures: a as any,
          cooking_steps: data.cooking_steps.map((step) => ({
            instruction: step.instruction,
            picture:
              typeof step.picture === "string"
                ? step.picture
                : step.picture?.[0],
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
