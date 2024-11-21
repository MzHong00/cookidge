import { useFieldArray, useForm } from "react-hook-form";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { IFridge } from "shared/api/fridge";
import { IRecipe } from "shared/api/recipe";
import { IIngredient, IIngredientInputDto } from "shared/api/ingredient";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { generateKey } from "shared/helper/generateKey";
import { getDateToISO } from "shared/helper/getDateToISO";
import {
  INGREDIENT_TABLE_FIELD,
  INGREDIENTS_CATEGORIES,
} from "entities/fridge";
import { useCreateIngredientMutation } from "../mutation/ingredientMutation";

import styles from "./ingredientForm.module.scss";
import { useEffect } from "react";

interface IngredientInputForm {
  ingredients: IIngredient[]; // 제네릭 타입에 Ingredient 배열을 명시
}

interface Props {
  fridge_id: IRecipe["_id"];
  stored_ingredients?: IFridge["stored_ingredients"];
  isReadMode: boolean;
}

export const IngredientForm = ({
  fridge_id,
  stored_ingredients,
  isReadMode,
}: Props) => {
  const { mutate } = useCreateIngredientMutation(fridge_id);

  const { control, register, handleSubmit, reset } =
    useForm<IngredientInputForm>({
      defaultValues: {
        ingredients: stored_ingredients || [
          { _id: generateKey(), expired_at: getDateToISO() },
        ],
      },
    });
  // `stored_ingredients`가 변경될 때마다 `reset` 호출
  useEffect(() => {
    if (stored_ingredients) {
      reset({ ingredients: stored_ingredients });
    }
  }, [stored_ingredients, reset]);
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onClickAppend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ _id: generateKey(), expired_at: getDateToISO() } as IIngredient);
  };

  const onSubmit = (data: IngredientInputForm) => {
    const ingredients = data.ingredients.map((ingredient) => {
      const { _id, ...inputIngredientDto } = ingredient;
      return inputIngredientDto as IIngredientInputDto;
    });

    mutate(ingredients);
    reset();
  };

  return (
    <SubjectBox title="재료 추가" className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ overflowY: "auto" }}>
          <table className={styles.table}>
            <colgroup className={styles.colgroup}>
              {Array.from({ length: 5 }).map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>
            <thead className={styles.tableHeader}>
              <tr>
                {INGREDIENT_TABLE_FIELD.map((filed) => (
                  <td key={filed}>{filed}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields?.map((ingredient, index) => (
                <tr key={ingredient._id} className={styles.ingredientTableItem}>
                  <td>
                    <select
                      id="category"
                      {...register(`ingredients.${index}.category`, {
                        required: true,
                      })}
                      className={`${isReadMode && styles.selectDisable}`}
                      disabled={isReadMode}
                    >
                      {INGREDIENTS_CATEGORIES.map((category) => (
                        <option key={category.text}>
                          {category.emoji} {category.text}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      placeholder="재료 이름"
                      {...register(`ingredients.${index}.name`, {
                        required: true,
                      })}
                      disabled={isReadMode}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="수량"
                      {...register(`ingredients.${index}.quantity`, {
                        required: true,
                      })}
                      disabled={isReadMode}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`ingredients.${index}.expired_at`, {
                        required: true,
                      })}
                      disabled={isReadMode}
                    />
                  </td>
                  {!isReadMode && (
                    <td>
                      <IconButton
                        Icon={CgRemoveR}
                        onClick={() => remove(index)}
                        className={styles.removeButton}
                        color="red"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isReadMode && (
          <>
            <div className={styles.appendButtonContainer}>
              <IconButton
                Icon={RiAddLine}
                className={styles.appendButton}
                onClick={onClickAppend}
              >
                추가
              </IconButton>
            </div>
            <input type="submit" className={styles.submitButton} value="확인" />
          </>
        )}
      </form>
    </SubjectBox>
  );
};
