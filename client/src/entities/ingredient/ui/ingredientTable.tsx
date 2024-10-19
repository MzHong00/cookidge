import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { type Ingredient } from "shared/types";
import { IconButton } from "shared/ui/iconButton";
import { INGREDIENTS_CATEGORIES } from "shared/consts";

import styles from "./ingredientTable.module.css";

interface Props extends React.TableHTMLAttributes<HTMLTableElement> {
  ingredients: Ingredient[];
  onClickEditItem?: () => void;
  onClickRemoveItem?: () => void;
  disabled?: boolean;
}

const INGREDIENT_TABLE_FIELD = ["분류", "이름", "유통기한", "수량"];

export const IngredientTable = ({
  ingredients,
  onClickEditItem,
  onClickRemoveItem,
  disabled,
  ...props
}: Props) => {
  return (
    <table {...props}>
      <thead>
        <tr className={styles.ingredientTableHeader}>
          {INGREDIENT_TABLE_FIELD.map((filed) => (
            <td key={filed}>{filed}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {ingredients?.map((ingredient) => (
          <tr key={ingredient._id} className={styles.ingredientTableItem}>
            <td>
              <select disabled={disabled}>
                {INGREDIENTS_CATEGORIES.map((item) => (
                  <option key={item} defaultValue={ingredient.category}>
                    {item}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                defaultValue={ingredient.name}
                placeholder="재료 이름"
                disabled={disabled}
                title={ingredient.name}
              />
            </td>
            <td>
              <input type="date" disabled={disabled} />
            </td>
            <td>
              <input
                defaultValue={ingredient.quantity}
                placeholder="수량"
                disabled={disabled}
              />
            </td>
            {(onClickEditItem || onClickRemoveItem) && (
              <td>
                {onClickEditItem && (
                  <IconButton
                    Icon={RiEditBoxLine}
                    onClick={onClickEditItem}
                    className={styles.ingredientActionButton}
                  />
                )}
                {onClickRemoveItem && (
                  <IconButton
                    Icon={CgRemoveR}
                    onClick={onClickRemoveItem}
                    className={styles.ingredientActionButton}
                  />
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
