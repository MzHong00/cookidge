import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage, compressImages } from "shared/lib/imageCompression";
import { RecipeForm, useCreateRecipeMutation } from "../..";
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 0.3,
  initialQuality: 1,
  useWebWorker: true,
};

export const CreateRecipeForm = () => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useCreateRecipeMutation();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        // const compressedCookImages = (await compressImages(
        //   data.pictures
        // )) as IRecipeForm["pictures"];

        const stepImages = data.cooking_steps.map(({ instruction, picture }) =>
          typeof picture === "string" ? picture : picture?.[0] || ""
        );

        // const compressedStepImages = await compressImages(stepImages);
        // console.log("압축됨:", compressedCookImages);
        // console.log("압축됨:", compressedStepImages);

        try {
        console.log(data.pictures);
        const a = Array.from(data.pictures as (string|File)[]).map((file) => {
            return typeof file === "string"
              ? file
              : imageCompression(file, options);
          });
          console.log(stepImages);
  
          const b = stepImages.map((file) => {
            return typeof file === "string"
              ? file
              : imageCompression(file, options);
          });
  
          const result = await Promise.all([...a, ...b]);
        console.log(result);
      } catch (error) {
          console.log(error);
          
        }
        
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
