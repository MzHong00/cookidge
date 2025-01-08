import { useFieldArray, UseFormReturn } from "react-hook-form";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IRecipeForm } from "shared/api/recipe";
import { InputBox } from "shared/ui/inputBox";
import { FadeLayout } from "shared/ui/fadeLayout";
import { IconButton } from "shared/ui/iconButton";
import { INGREDIENTS_CATEGORIES } from "entities/ingredient";

import styles from "./recipeForm.module.scss";

export const IngredientField = ({
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
      <FadeLayout key="ingredients">
        <label>재료</label>
        <ul className="w-full flex-column">
          {ingredientFields.map((filed, index) => (
            <FadeLayout key={filed.id}>
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
            </FadeLayout>
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
      </FadeLayout>
    );
  };