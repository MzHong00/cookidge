import { SubmitHandler } from "react-hook-form";

import { useAlertActions } from "shared/ui/alert";
import type { IRecipeForm } from "shared/api/recipe";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { compressImageToBase64 } from "shared/lib/imageCompression";
import { RecipeForm, useCreateRecipeMutation } from "../..";

export const CreateRecipeForm = () => {
  const { mutateAsync } = useCreateRecipeMutation();
  const { openDialogMessage, setProcessMessage } = useConfirmDialogActions();
  const { alertEnqueue } = useAlertActions();

  const onSubmit: SubmitHandler<IRecipeForm> = async (data) => {
    openDialogMessage({
      message: `${data.name} 레시피를 생성하시겠습니까?`,
      requestFn: async () => {
        try {
          setProcessMessage("이미지 압축 중...");
          const compressedCookImages = (await Promise.all(
            Array.from(data.pictures as (string | File)[]).map((file) =>
              typeof file === "string" ? file : compressImageToBase64(file)
            )
          )) as IRecipeForm["pictures"];

          const compressedStepImages = await Promise.all(
            data.cooking_steps.map(async ({ instruction, picture }) => ({
              instruction: instruction,
              picture:
                typeof picture === "string"
                  ? picture
                  : picture &&
                    ((await compressImageToBase64(picture[0])) as string),
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
              "레시피 생성에 실패하였습니다. ※ 모바일 환경에서 원활하지 않을 수 있습니다.",
            type: "error",
          });
        }
      },
    });
  };

  return <RecipeForm onSubmit={onSubmit} submitTitle="레시피 생성" />;
};
