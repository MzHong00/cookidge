import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm, IRecipeInputDTO } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage, compressImages } from "shared/lib/imageCompression";
import { RecipeForm, useCreateRecipeMutation } from "../..";
import imageCompression from "browser-image-compression";
import { resizeFile } from "shared/lib/react-resizer";

const options = {
  maxSizeMB: 0.3,
  initialQuality: 1,
  useWebWorker: true,
};

export const CreateRecipeForm = () => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useCreateRecipeMutation();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    console.log(data.pictures, data.cooking_steps);
    
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        const a = Array.from(data.pictures as (string | File)[]).map((file) =>
          typeof file === "string" ? file : resizeFile(file)
        );
        console.log(a);

        const b = data.cooking_steps.map(({ picture }) =>
          typeof picture === "string" ? picture : resizeFile(picture?.[0])
        );
        console.log(b);

        const compressedCookImages = await Promise.all([...a, ...b]);
        console.log(compressedCookImages);

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
