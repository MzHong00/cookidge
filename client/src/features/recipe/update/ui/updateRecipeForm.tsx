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
        let a = [];

        for (const file of Array.from(data.pictures as (string | File)[])) {
          if (typeof file === "string") {
            a.push(file); // 문자열인 경우 그대로 배열에 추가
          } else {
            const resizedFile = await compressImage(file); // 비동기 작업 완료 후 결과 추가
            a.push(resizedFile);
          }
        }

        console.log(a);

        let b = [];

        for (const { picture } of data.cooking_steps) {
          if (typeof picture === "string") {
            b.push(picture); // 문자열인 경우 그대로 배열에 추가
          } else {
            const resizedPicture = await compressImage(picture?.[0]); // 비동기 작업 완료 후 결과 추가
            b.push(resizedPicture);
          }
        }
        console.log(b);
        

        // const compressedCookImages = (await compressImages(
        //   data.pictures
        // )) as IRecipeForm["pictures"];
        // console.log(compressedCookImages);

        // const compressedStepImages = await Promise.all(
        //   data.cooking_steps.map(async ({ instruction, picture }) => ({
        //     instruction: instruction,
        //     picture:
        //       typeof picture === "string"
        //         ? picture
        //         : await compressImage(picture?.[0]),
        //   }))
        // );
        // console.log(compressedStepImages);

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
