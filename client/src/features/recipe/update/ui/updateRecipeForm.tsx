import { SubmitHandler } from "react-hook-form";

import { useAlertActions } from "shared/ui/alert";
import type { IRecipeForm } from "shared/api/recipe/type";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImage } from "shared/lib/imageCompression";
import { RecipeForm } from "features/recipe/create";
import { useUpdateRecipeMutation } from "..";

interface Props {
  defalutValues: IRecipeForm;
}

export const UpdateRecipeForm = ({ defalutValues }: Props) => {
  const { openDialogMessage, setProcessMessage } = useConfirmDialogActions();
  const { mutateAsync } = useUpdateRecipeMutation(defalutValues._id);
  const { alertEnqueue } = useAlertActions();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `레시피를 업데이트하시겠습니까?`,
      requestFn: async () => {
        try {
          setProcessMessage("이미지 압축 중...");
          const compressedCookImages = (await Promise.all(
            Array.from(data.pictures as (string | File)[]).map((file) =>
              typeof file === "string" ? file : compressImage(file)
            )
          )) as IRecipeForm["pictures"];

          const compressedStepImages = await Promise.all(
            data.cooking_steps.map(async ({ instruction, picture }) => ({
              instruction: instruction,
              picture:
                typeof picture === "string"
                  ? picture
                  : await compressImage(picture?.[0]),
            }))
          );

          setProcessMessage("서버에 전송 중...");
          await mutateAsync({
            ...data,
            pictures: compressedCookImages,
            cooking_steps: compressedStepImages,
          });
        } catch (error) {
          alertEnqueue({
            message:
              "레시피 업데이트에 실패하였습니다. ※ 모바일 환경에서 원활하지 않을 수 있습니다.",
            type: "error",
          });
        }
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
