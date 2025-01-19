import { useFieldArray, useForm } from "react-hook-form";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import type { IFridge } from "shared/api/fridge";
import type { IIngredient, IIngredientInputDto } from "shared/api/ingredient";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { generateKey } from "shared/helper/generateKey";
import { getDateToISO } from "shared/helper/getDateToISO";
import {
  INGREDIENT_TABLE_FIELD,
  INGREDIENTS_CATEGORIES,
} from "entities/ingredient";
import { useUpdateIngredientMutation } from "..";

import styles from "./updateIngredientForm.module.scss";

interface IngredientInputForm {
  ingredients: IIngredient[];
}

interface Props {
  fridge_id: IFridge["_id"];
  onSubmitAttach: () => void;
  stored_ingredients?: IFridge["stored_ingredients"];
}

export const UpdateIngredientForm = ({
  fridge_id,
  onSubmitAttach,
  stored_ingredients,
}: Props) => {
  const { mutate } = useUpdateIngredientMutation(fridge_id);

  const { control, register, handleSubmit, reset } =
    useForm<IngredientInputForm>({
      defaultValues: {
        ingredients: stored_ingredients || [
          { _id: generateKey(), expired_at: getDateToISO() },
        ],
      },
    });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onClickAppendField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ _id: generateKey(), expired_at: getDateToISO() } as IIngredient);
  };

  const onSubmit = (data: IngredientInputForm) => {
    const ingredients = data.ingredients.map((ingredient) => {
      const { _id, ...inputIngredientDto } = ingredient;
      return inputIngredientDto as IIngredientInputDto;
    });

    onSubmitAttach();
    mutate(ingredients);
    reset();
  };

  return (
    <SubjectBox title="재료 추가" className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ overflowY: "auto" }}>
          <table className={styles.table}>
            <colgroup >
              {Array.from({ length: 5 }).map((_, i) => (
                <col key={i} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {INGREDIENT_TABLE_FIELD.map((filed) => (
                  <td key={filed}>{filed}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields?.map((ingredient, index) => (
                <tr key={ingredient._id} className={styles.ingredient}>
                  <td>
                    <select
                      id="category"
                      {...register(`ingredients.${index}.category`, {
                        required: true,
                      })}
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
                    />
                  </td>
                  <td>
                    <input
                      placeholder="수량"
                      {...register(`ingredients.${index}.quantity`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`ingredients.${index}.expired_at`, {
                        required: true,
                      })}
                    />
                  </td>
                  <td>
                    <IconButton
                      Icon={CgRemoveR}
                      onClick={() => remove(index)}
                      className={styles.removeButton}
                      color="red"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className={styles.appendButton}>
            <IconButton
              Icon={RiAddLine}
              onClick={onClickAppendField}
            >
              추가
            </IconButton>
          </div>
          <input type="submit" className={styles.submitButton} value="확인" />
      </form>
    </SubjectBox>
  );
};
