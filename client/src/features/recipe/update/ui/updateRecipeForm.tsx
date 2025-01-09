import { SubmitHandler } from "react-hook-form";

import type { IRecipeForm, IRecipeInputDTO } from "shared/api/recipe/type";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage, compressImages } from "shared/lib/imageCompression";
import { RecipeForm } from "features/recipe/create";
import { useUpdateRecipeMutation } from "..";
import imageCompression from "browser-image-compression";
import { resizeFile } from "shared/lib/react-resizer";

const options = {
  maxSizeMB: 0.3,
  initialQuality: 1,
  useWebWorker: true,
};
interface Props {
  defalutValues: IRecipeForm;
}

export const UpdateRecipeForm = ({ defalutValues }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  const { mutateAsync } = useUpdateRecipeMutation(defalutValues._id);

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    const { pictures, cooking_steps } = data;
    openDialogMessage({
      message: `레시피를 업데이트하시겠습니까?`,
      requestFn: async () => {
        let a = [];

        for (const file of Array.from(pictures as (string | File)[])) {
          console.log(file);

          if (typeof file === "string") {
            a.push(file);
          } else {
            const resizedFile = await resizeFile(file);
            a.push(resizedFile);
          }
        }

        console.log(a);

        let b = [];

        for (const { picture } of cooking_steps) {
          console.log(picture);

          if (typeof picture === "string") {
            b.push(picture);
          } else if (!picture?.length) {
            console.log("텅빈");
            
            b.push("");
          } else {
            const resizedPicture = await resizeFile(picture[0]);
            b.push(resizedPicture);
          }
        }
        console.log(b);
        // const a = Array.from(data.pictures as (string | File)[]).map((file) =>
        //   typeof file === "string" ? file : resizeFile(file)
        // );

        // const b = data.cooking_steps.map(({ picture }) =>
        //   typeof picture === "string" ? picture : resizeFile(picture?.[0])
        // );
        // console.log(b);
        // const compressedCookImages = await Promise.all([...a, ...b]);
        // console.log(compressedCookImages);

        // as IRecipeInputDTO["cooking_steps"];

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
