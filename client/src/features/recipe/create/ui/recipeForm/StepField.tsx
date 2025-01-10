import { memo } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiUpload2Line } from "@react-icons/all-files/ri/RiUpload2Line";

import type { ICookingStep, IRecipeForm } from "shared/api/recipe";
import { FadeLayout } from "shared/ui/fadeLayout";
import { IconButton } from "shared/ui/iconButton";
import { CldImg } from "shared/ui/cloudinaryImage/cloudinaryImage";
import { usePreviewSteps } from "../../model/usePreviewSteps";

import styles from "./recipeForm.module.scss";

export const StepField = memo(({
  register,
  control,
  defaultSteps,
}: Pick<UseFormReturn<IRecipeForm>, "register" | "control"> & {
  defaultSteps?: ICookingStep[];
}) => {
  const INTRODUCE_LIMIT_LENGTH = 100;

  const {
    fields: cookingStepFields,
    append: appendCookingStep,
    remove: removeCookingStep,
  } = useFieldArray({
    name: "cooking_steps",
    control,
  });

  return (
    <div key="cookingSteps" className="flex-column">
      <label>요리 과정</label>
      <ul className={styles.steps}>
        {cookingStepFields.map((field, i) => (
          <FadeLayout key={`${field.id}`}>
            <li className={styles.step}>
              <div>
                <h2>{i + 1}</h2>
                <IconButton
                  Icon={CgRemoveR}
                  onClick={(e) => {
                    e.preventDefault();
                    removeCookingStep(i);
                  }}
                  className={styles.removeButton}
                  style={{ alignItems: "stretch" }}
                />
              </div>
              <div>
                <PreviewStepImage
                  index={i}
                  id={field.id}
                  register={register}
                  introduction="이미지 추가"
                  defaultImage={defaultSteps?.[i]?.picture || ""}
                />

                <textarea
                  id="step1"
                  placeholder="조리 과정을 설명해주세요."
                  {...register(`cooking_steps.${i}.instruction`, {
                    required: `${i + 1}번째 요리 과정 설명을 입력해 주세요.`,
                    maxLength: {
                      value: INTRODUCE_LIMIT_LENGTH,
                      message: `요리 과정 설명을 ${INTRODUCE_LIMIT_LENGTH}자 내외로 입력해 주세요.`,
                    },
                  })}
                />
              </div>
            </li>
          </FadeLayout>
        ))}
      </ul>
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
    </div>
  );
});

const PreviewStepImage = memo(({
  id,
  index,
  introduction,
  defaultImage,
  register,
}: Pick<UseFormReturn<IRecipeForm>, "register"> & {
  id: string;
  index: number;
  introduction: string;
  defaultImage: string;
}) => {
  console.log(index);
  
  // const { previewImage, previewOnChange } = usePreviewSteps(defaultImage);

  return (
    <div className={styles.previewStepImage}>
      <label htmlFor={id}>
        {/* {previewImage ? (
          <CldImg
            cldImg={previewImage}
            className={styles.image}
            style={{ aspectRatio: 1 }}
          />
        ) : ( */}
          <div className={styles.uploadPlaceholder}>
            <RiUpload2Line size={24} />
            {introduction && <p>{introduction || "이미지 추가"}</p>}
          </div>
        {/* )} */}
      </label>

      <input
        id={id}
        type="file"
        accept="image/*"
        {...register(`cooking_steps.${index}.picture`, {
          // onChange: previewOnChange,
        })}
      />
    </div>
  );
}
)