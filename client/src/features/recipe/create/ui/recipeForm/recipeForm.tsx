import {
  useForm,
  SubmitHandler,
  useFieldArray,
  UseFormReturn,
  SubmitErrorHandler,
} from "react-hook-form";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";

import { InputBox } from "shared/ui/inputBox";
import { InputFile } from "shared/ui/inputFile";
import { SubjectBox } from "shared/ui/subjectBox";
import { IconButton } from "shared/ui/iconButton";
import { InfoTooltip } from "shared/ui/infoToolTip";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { useConfirmDialogActions } from "shared/ui/confirmDialog";
import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";
import { IRecipeForm } from "shared/api/recipe/type";
import { usePreviewImages } from "shared/hooks/usePreviewImages";
import { FOOD_CATEGORIES } from "entities/recipe";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";

import { usePreviewSteps } from "../..";

import styles from "./recipeForm.module.scss";

const NAME_LIMIT_LENGTH = 20;
const INTRODUCE_LIMIT_LENGTH = 200;

interface Props {
  defalutValues?: IRecipeForm;
  submitTitle: string;
  onSubmit: SubmitHandler<IRecipeForm>;
}

export const RecipeForm = ({ defalutValues, submitTitle, onSubmit }: Props) => {
  const { openDialogMessage } = useConfirmDialogActions();

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
  const previewSteps = usePreviewSteps(watch("cooking_steps"));

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
    <FramerFadeLayout>
      <form className="flex-column" onSubmit={handleSubmit(onSubmit, onError)}>
        <SubjectBox title={submitTitle} className={styles.formContent}>
          <div className={styles.pictureSection}>
            <label className={styles.pictureLabel}>
              사진
              <InfoTooltip
                message="Cookidge는 500x500px 이미지를 제일 좋아합니다! 사진을 드래그하여 여러 개 선택하세요."
                style={{ fontSize: "0.9em" }}
              />
            </label>
            <InputFile
              id="pictures"
              className={styles.pictureUpload}
              {...register(`pictures`, {
                validate: () =>
                  !!previewFoodImages.length ||
                  "대표 요리사진을 선택해 주세요.",
              })}
              multiple
            />
            <ul className={styles.previewImageConatiner}>
              {previewFoodImages?.map((image) => (
                <li key={image} className={styles.previewImage}>
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

          <InputBox
            id="introduce"
            label="소개"
            placeholder="요리의 간단한 소개를 작성해주세요."
            {...register("introduction", {
              required: "요리의 간단한 소개를 작성해 주세요.",
              maxLength: {
                value: INTRODUCE_LIMIT_LENGTH,
                message: `요리 소개를 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
              },
            })}
          />

          <div className={styles.categoriesInput}>
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

          <CookingStepField
            register={register}
            control={control}
            previewImages={previewSteps}
          />
        </SubjectBox>

        <SubjectBox className={styles.submitContainer}>
          <InputBox
            type="submit"
            value={submitTitle}
            className="main-button"
            disabled={isLoading}
          />
        </SubjectBox>
      </form>
    </FramerFadeLayout>
  );
};

const IngredientField = ({
  control,
  register,
}: Pick<UseFormReturn<IRecipeForm>, "register" | "control">) => {
  const NAME_LIMIT_LENGTH = 20;
  const QUANTITY_LIMIT_LENGTH = 8;

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
    rules: {
      required: {
        value: true,
        message: "요리 재료를 1개 이상 입력해 주세요.",
      },
    },
  });

  return (
    <FramerFadeLayout key="ingredients">
      <label>재료</label>
      <ul className="w-full flex-column">
        {ingredientFields.map((filed, index) => (
          <FramerFadeLayout key={filed.id}>
            <li className="w-full flex-row">
              <select
                id="category"
                {...register(`ingredients.${index}.category`, {
                  required: true,
                })}
              >
                {INGREDIENTS_CATEGORIES.map((category) => (
                  <option key={category.text} value={category.text}>
                    {category.emoji} {category.text}
                  </option>
                ))}
              </select>
              <InputBox
                id="ingredient-1"
                placeholder="재료 이름을 입력하세요."
                {...register(`ingredients.${index}.name`, {
                  required: `${index + 1}번째 재료 이름을 입력해 주세요.`,
                  maxLength: {
                    value: NAME_LIMIT_LENGTH,
                    message: `재료 이름을 ${NAME_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
                  },
                })}
              />
              <InputBox
                id="quantity-1"
                placeholder="양을 입력하세요. ex) 1개, 1큰술, 1컵"
                {...register(`ingredients.${index}.quantity`, {
                  required: `${index + 1}번째 재료 양을 입력해 주세요.`,
                  maxLength: {
                    value: QUANTITY_LIMIT_LENGTH,
                    message: `재료 양을 ${QUANTITY_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
                  },
                })}
              />
              <IconButton
                Icon={CgRemoveR}
                className={styles.removeButton}
                onClick={(e) => {
                  e.preventDefault();
                  ingredientRemove(index);
                }}
              />
            </li>
          </FramerFadeLayout>
        ))}
        <IconButton
          Icon={RiAddLine}
          className={styles.appendButton}
          onClick={(e) => {
            e.preventDefault();
            ingredientAppend({ name: "", quantity: "", category: "고기" });
          }}
        >
          추가
        </IconButton>
      </ul>
    </FramerFadeLayout>
  );
};

const CookingStepField = ({
  register,
  control,
  previewImages,
}: Pick<UseFormReturn<IRecipeForm>, "register" | "control"> & {
  previewImages: string[];
}) => {
  const INTRODUCE_LIMIT_LENGTH = 50;

  const {
    fields: cookingStepFields,
    append: appendCookingStep,
    remove: removeCookingStep,
  } = useFieldArray({
    name: "cooking_steps",
    control,
    rules: {
      required: {
        value: true,
        message: "요리 과정을 1개 이상 입력해 주세요.",
      },
    },
  });

  return (
    <div key="cookingSteps" className="flex-column">
      <label>요리 과정</label>
      <ul className="w-full flex-column">
        {cookingStepFields.map((field, i) => (
          <FramerFadeLayout key={`${field.id}${i}`}>
            <li className="w-full flex-row">
              <h2>{i + 1}</h2>
              <div className={styles.stepInputBox}>
                <InputFile
                  id={field.id}
                  type="file"
                  introduction="이미지 추가"
                  previewUrl={previewImages[i]}
                  {...register(`cooking_steps.${i}.picture`)}
                />
                <textarea
                  id="step1"
                  placeholder="조리 과정을 설명해주세요."
                  className={styles.stepTextArea}
                  {...register(`cooking_steps.${i}.instruction`, {
                    required: `${i + 1}번째 요리 과정 설명을 입력해 주세요.`,
                    maxLength: {
                      value: INTRODUCE_LIMIT_LENGTH,
                      message: `요리 과정 설명을 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
                    },
                  })}
                />
              </div>
              <IconButton
                Icon={CgRemoveR}
                onClick={(e) => {
                  e.preventDefault();
                  removeCookingStep(i);
                }}
                className={styles.removeButton}
                style={{ alignItems: "stretch" }}
              />
            </li>
          </FramerFadeLayout>
        ))}
        <IconButton
          Icon={RiAddLine}
          className={styles.appendButton}
          onClick={(e) => {
            e.preventDefault();
            appendCookingStep({ picture: "", instruction: "" });
          }}
        >
          추가
        </IconButton>
      </ul>
    </div>
  );
};
