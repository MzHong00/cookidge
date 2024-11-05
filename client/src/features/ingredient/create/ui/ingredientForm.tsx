import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import { Ingredient } from "shared/api/fridge";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import {
  INGREDIENT_TABLE_FIELD,
  INGREDIENTS_CATEGORIES,
} from "entities/fridge";

import styles from "./ingredientForm.module.scss";
import { useFieldArray, useForm } from "react-hook-form";
import { generateKey } from "shared/helper/generateKey";
import { getDateToISO } from "shared/helper/getDateToISO";

interface IngredientForm {
  ingredients: Partial<Ingredient>[]; // 제네릭 타입에 Ingredient 배열을 명시
}

interface Props {
  disabled?: boolean;
}

const defaultIngredient = { _id: generateKey(), expired_at: getDateToISO() };

export const IngredientForm = ({ disabled }: Props) => {
  const { control, register, handleSubmit, reset } = useForm<IngredientForm>({
    defaultValues: {
      ingredients: [defaultIngredient],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const onClickAppend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append(defaultIngredient);
  };

  const onSubmit = (data: IngredientForm) => {
    console.log(data);
  };

  return (
    <SubjectBox title="재료 추가" className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ overflowY: "auto" }}>
          <table className={styles.table}>
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
                  <td style={{ position: "relative" }}>
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
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    <input
                      placeholder="수량"
                      {...register(`ingredients.${index}.quantity`, {
                        required: true,
                      })}
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      {...register(`ingredients.${index}.expired_at`, {
                        required: true,
                      })}
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    {disabled && (
                      <IconButton
                        Icon={RiEditBoxLine}
                        className={styles.ingredientActionButton}
                      />
                    )}
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
        <IconButton
          Icon={RiAddLine}
          className={styles.appendButton}
          onClick={onClickAppend}
        >
          추가
        </IconButton>
        <div className={styles.whiteSpace} />
        <input type="submit" className={styles.submitButton} value="확인" />
      </form>
    </SubjectBox>
  );
};
