import { RiEditBoxLine } from "@react-icons/all-files/ri/RiEditBoxLine";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";

import { type Ingredient } from "shared/types";
import { IconButton } from "shared/ui/iconButton";
import { IconCategoriesBox } from "shared/ui/iconCategoriesBox";
import { INGREDIENTS_CATEGORIES } from "../";

import styles from "./ingredientTable.module.css";
import { useModal } from "shared/hooks/useModal";

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
  className,
  disabled,
  ...props
}: Props) => {
  const { isOpen, toggleModal } = useModal();

  return (
    <table className={`w-full ${className}`} {...props}>
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
            <td style={{ position: "relative" }}>
              <input
                type="button"
                defaultValue={"고기"}
                style={{ width: "fit-content" }}
                onClick={(e) => {
                  toggleModal(e);
                }}
              />
              {isOpen && (
                <IconCategoriesBox
                  title="재료 카테고리"
                  itemList={INGREDIENTS_CATEGORIES}
                  className={styles.categoriesBox}
                />
              )}
            </td>
            <td>
              <input
                defaultValue={ingredient.name}
                placeholder="재료 이름"
                title={ingredient.name}
                disabled={disabled}
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
