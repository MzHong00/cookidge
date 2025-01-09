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
        let a = [];

        for (const file of Array.from(data.pictures as (string | File)[])) {
          if (typeof file === "string") {
            a.push(file); // 문자열인 경우 그대로 배열에 추가
          } else {
            const resizedFile = await resizeFile(file); // 비동기 작업 완료 후 결과 추가
            a.push(resizedFile);
          }
        }

        console.log(a);
        
        let b = [];

        for (const { picture } of data.cooking_steps) {
          if (typeof picture === "string") {
            b.push(picture); // 문자열인 경우 그대로 배열에 추가
          } else {
            const resizedPicture = await resizeFile(picture?.[0]); // 비동기 작업 완료 후 결과 추가
            b.push(resizedPicture);
          }
        }
        
        console.log(b);

        // const compressedCookImages = await Promise.all([...a, ...b]);
        // console.log(compressedCookImages);

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
