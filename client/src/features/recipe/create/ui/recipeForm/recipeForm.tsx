import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";

import type { ICookingStep, IRecipeForm } from "shared/api/recipe/type";
import { InputBox } from "shared/ui/inputBox";
import { TextArea } from "shared/ui/textArea";
import { InputFile } from "shared/ui/inputFile";
import { SubjectBox } from "shared/ui/subjectBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { InfoTooltip } from "shared/ui/infoToolTip";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";
import { usePreviewImages } from "shared/hooks/usePreviewImages";
import { FOOD_CATEGORIES } from "entities/recipe";
import { StepField } from "./StepField";
import { IngredientField } from "./ingredientField";

import styles from "./recipeForm.module.scss";

const NAME_LIMIT_LENGTH = 20;
const INTRODUCE_LIMIT_LENGTH = 100;

interface Props {
  defalutValues?: IRecipeForm;
  submitTitle: string;
  onSubmit: SubmitHandler<IRecipeForm>;
}

export const RecipeForm = ({ defalutValues, submitTitle, onSubmit }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();
  console.log("form");
  
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm<IRecipeForm>({
    mode: "onChange",
    defaultValues: defalutValues || {
      ingredients: [{ name: "", quantity: "", category: "고기" }],
      cooking_steps: [{ picture: "", instruction: "" }],
    },
  });
  const previewFoodImages = usePreviewImages(watch("pictures"));
  
  const onError: SubmitErrorHandler<IRecipeForm> = (errors) => {
    const { ingredients, cooking_steps, ...errorFields } = errors;

    const ingredientErrorField: any = ingredients;
    const cookingStepErrorFields: any = cooking_steps;

    const ingredientErrorMessages = ingredientErrorField?.["root"]
      ? ingredientErrorField["root"].message
      : ingredientErrorField?.map((field: any) => [
          field?.name?.message || "",
          field?.quantity?.message || "",
        ]);

    const cookingStepsErrorMessages = cookingStepErrorFields?.["root"]
      ? cookingStepErrorFields["root"].message
      : cookingStepErrorFields?.map((field: any) => [
          field?.instruction?.message || "",
        ]);

    const remainErrorMessages = Object.values(errorFields).map(
      (field) => field.message || ""
    );

    openDialogMessage({
      message: `❗️ 입력 필드를 확인해 주세요!`,
      descriptions: [
        remainErrorMessages,
        ingredientErrorMessages,
        cookingStepsErrorMessages,
      ]
        .flat(2)
        .filter((value) => value),
      option: { backspace: false },
    });
  };

  return (
    <FadeLayout>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit, onError)}>
        <SubjectBox title={submitTitle} className={styles.formContent}>
          <div className={styles.pictureSection}>
            <label>
              사진
              <InfoTooltip
                message="500x500px 이미지를 제일 좋아합니다! 사진을 드래그하여 여러 개 선택하세요."
              />
            </label>
            <InputFile
              id="pictures"
              className={styles.imageUploader}
              {...register(`pictures`, {
                validate: () =>
                  !!previewFoodImages.length ||
                  "대표 요리사진을 선택해 주세요.",
              })}
              multiple
            />
            <ul>
              {previewFoodImages?.map((image) => (
                <li key={image} className={styles.imagePreview}>
                  <CldImg cldImg={image} />
                </li>
              ))}
            </ul>
          </div>

          <InputBox
            id="name"
            label="이름"
            placeholder="요리 이름을 입력하세요."
            {...register("name", {
              required: "요리 이름을 입력해 주세요.",
              maxLength: {
                value: NAME_LIMIT_LENGTH,
                message: `요리 이름을 ${NAME_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
              },
            })}
          />

          <TextArea
            id="introduce"
            label="소개"
            length={watch('introduction')?.length || 0}
            maxLength={INTRODUCE_LIMIT_LENGTH}
            placeholder="요리의 간단한 소개를 작성해주세요."
            {...register("introduction", {
              required: "요리의 간단한 소개를 작성해 주세요.",
              maxLength: {
                value: INTRODUCE_LIMIT_LENGTH,
                message: `요리 소개를 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
              },
            })}
          />

          <div className={styles.category}>
            <label htmlFor="category">카테고리</label>
            <select id="category" {...register("category", { required: true })}>
              {FOOD_CATEGORIES.map((category) => (
                <option key={category.text} value={category.text}>
                  {category.emoji} {category.text}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-row-between">
            <InputBox
              id="cooking_time"
              Icon={RiTimer2Line}
              label="조리 시간(분)"
              type="number"
              defaultValue={1}
              className="w-full"
              {...register("cooking_time", {
                required: "조리 시간을 설정해 주세요.",
                min: { value: 1, message: "올바르지 않은 조리 시간입니다." },
                max: { value: 2400, message: "올바르지 않은 조리 시간입니다." },
              })}
            />
            <InputBox
              id="serving"
              Icon={RiGroupLine}
              label="인분"
              type="number"
              defaultValue={1}
              className="w-full"
              {...register("servings", {
                required: "몇 인분인지 설정해 주세요.",
                min: { value: 1, message: "올바르지 않은 인분 설정입니다." },
                max: { value: 300, message: "올바르지 않은 인분 설정입니다." },
              })}
            />
          </div>

          <IngredientField register={register} control={control} />

          <StepField
            register={register}
            control={control}
            defaultSteps={defalutValues?.cooking_steps as ICookingStep[] | undefined}
          />
        </SubjectBox>

        <SubjectBox className={styles.submit}>
          <InputBox
            type="submit"
            value={submitTitle}
            className="main-button"
            disabled={isLoading}
          />
        </SubjectBox>
      </form>
    </FadeLayout>
  );
};


