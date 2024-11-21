import {
  Form,
  FormSubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { RiGroupLine } from "@react-icons/all-files/ri/RiGroupLine";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { InputBox } from "shared/ui/inputBox";
import { InputFile } from "shared/ui/inputFile";
import { SubjectBox } from "shared/ui/subjectBox";
import { IconButton } from "shared/ui/iconButton";
import { InfoTooltip } from "shared/ui/infoToolTip";
import { ItemSelectionBox } from "shared/ui/itemSelection";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { IRecipeInputDto } from "shared/api/recipe/type";
import { FOOD_CATEGORIES } from "entities/recipe";
import { INGREDIENTS_CATEGORIES } from "entities/fridge";
import { RECIPE_INPUT_SECTION } from "../consts/consts";
import { useSelectInput } from "../model/useSelectInput";
import { useImagePreview } from "../model/useImagePreview";
import { usePreviewStepPicture } from "../model/useStepPreview";
import { useCreateRecipeMutation } from "../mutation/createRecipeMutation";

import styles from "./recipeCreationForm.module.scss";

export const RecipeCreationForm = () => {
  const { mutate, isPending } = useCreateRecipeMutation();

  const { activeSection, changeSectionHandler } = useSelectInput();

  const { register, control, watch } = useForm<IRecipeInputDto>({
    mode: "onBlur",
  });

  const previewFoodImages = useImagePreview(watch("pictures"));
  const { stepPictures, onChangeStepPreviewPicture } = usePreviewStepPicture();

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    name: "ingredients",
    control,
  });

  const {
    fields: cookingStepFields,
    append: cookingStepAppend,
    remove: cookingStepRemove,
  } = useFieldArray({
    name: "cooking_steps",
    control,
  });

  const onSubmit: FormSubmitHandler<IRecipeInputDto> = ({ data }) => {
    const binaryCookingStepPictures = data.cooking_steps.map((step) => ({
      ...step,
      picture: undefined,
    }));

    const finalForm = {
      ...data,
      cooking_step_pictures: data.cooking_steps.map(
        (step) => step.picture?.[0]
      ),
      cooking_steps: binaryCookingStepPictures,
    };

    mutate(finalForm);
  };

  return (
    <FramerFadeLayout>
      <Form className="flex-column" control={control} onSubmit={onSubmit}>
        <SubjectBox title="레시피 생성" className={styles.formContent}>
          <div className={styles.pictureSection}>
            <label className={styles.pictureLabel}>
              사진
              <InfoTooltip message="사진을 드래그하여 여러 개 선택하세요" />
            </label>
            <InputFile
              id="pictures"
              className={styles.pictureUpload}
              color="white"
              {...register(`pictures`, { required: true })}
              multiple
            />
            <ul className={styles.previewImageConatiner}>
              {previewFoodImages?.map((image) => (
                <li key={image} className={styles.previewImage}>
                  <img src={image} alt="" />
                </li>
              ))}
            </ul>
          </div>
          <InputBox
            id="name"
            label="이름"
            placeholder="요리 이름을 입력하세요."
            {...register("name", {
              required: true,
            })}
          />
          <InputBox
            id="introduce"
            label="소개"
            placeholder="요리의 간단한 소개를 작성해주세요."
            {...register("introduction", { required: true })}
          />

          <div className={styles.categoriesInput}>
            <label htmlFor="categories">카테고리</label>
            <select
              id="categories"
              {...register("category", { required: true })}
            >
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
              defaultValue={0}
              className="w-full"
              {...register("cooking_time", { required: true })}
            />
            <InputBox
              id="serving"
              Icon={RiGroupLine}
              label="인분"
              type="number"
              defaultValue={0}
              className="w-full"
              {...register("servings", { required: true })}
            />
          </div>

          <ItemSelectionBox
            itemList={RECIPE_INPUT_SECTION}
            activeItem={activeSection}
            onclick={changeSectionHandler}
          />
          {activeSection === "재료" ? (
            <FramerFadeLayout key="재료">
              <ul className="w-full flex-column">
                {ingredientFields.map((filed, index) => (
                  <li key={filed.id} className="w-full flex-row">
                    <select
                      id="category"
                      {...register(`ingredients.${index}.category`)}
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
                        required: true,
                      })}
                    />
                    <InputBox
                      id="quantity-1"
                      placeholder="양을 입력하세요. ex) 1개, 1큰술, 1컵"
                      {...register(`ingredients.${index}.quantity`, {
                        required: true,
                      })}
                    />
                    <IconButton
                      Icon={CgRemoveR}
                      className={styles.removeButton}
                      onClick={() => ingredientRemove(index)}
                    />
                  </li>
                ))}
                <IconButton
                  Icon={RiAddLine}
                  className={styles.appendButton}
                  onClick={() => ingredientAppend({} as any)}
                >
                  추가
                </IconButton>
              </ul>
            </FramerFadeLayout>
          ) : (
            <FramerFadeLayout key="과정" className="flex-row">
              <ul className="w-full flex-column">
                {cookingStepFields.map((filed, i) => (
                  <li key={filed.id} className="w-full flex-row">
                    <h2>{i + 1}</h2>
                    <div className={styles.stepInputBox}>
                      <InputFile
                        id={filed.id}
                        type="file"
                        introduction="이미지 추가"
                        previewUrl={stepPictures[`cooking_steps.${i}.picture`]}
                        {...register(`cooking_steps.${i}.picture`, {
                          onChange: onChangeStepPreviewPicture,
                        })}
                      />
                      <textarea
                        id="step1"
                        placeholder="조리 과정을 설명해주세요."
                        className={styles.stepTextArea}
                        {...register(`cooking_steps.${i}.instruction`, {
                          required: true,
                        })}
                      />
                    </div>
                    <IconButton
                      Icon={CgRemoveR}
                      onClick={() => cookingStepRemove(i)}
                      className={styles.removeButton}
                      style={{ alignItems: "stretch" }}
                    />
                  </li>
                ))}
                <IconButton
                  Icon={RiAddLine}
                  className={styles.appendButton}
                  onClick={() => cookingStepAppend({} as any)}
                >
                  추가
                </IconButton>
              </ul>
            </FramerFadeLayout>
          )}
        </SubjectBox>
        <SubjectBox>
          <InputBox
            type="submit"
            value={"레시피 생성하기"}
            className="main-button"
          />
        </SubjectBox>
      </Form>
    </FramerFadeLayout>
  );
};
