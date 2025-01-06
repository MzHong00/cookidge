import type { IFridge } from "shared/api/fridge";
import { SubjectBox } from "shared/ui/subjectBox";
import { INGREDIENT_TABLE_FIELD } from "..";

import styles from './ingredientList.module.scss'

interface Props {
  stored_ingredients: IFridge["stored_ingredients"];
}

export const IngredientList = ({ stored_ingredients }: Props) => {
  return (
    <SubjectBox title="재료 목록" className={styles.container}>
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
            {stored_ingredients?.map((ingredient) => (
              <tr key={ingredient._id} className={styles.ingredientTableItem}>
                <td title={ingredient.category}>{ingredient.category}</td>
                <td title={ingredient.name}>{ingredient.name}</td>
                <td title={ingredient.quantity}>{ingredient.quantity}</td>
                <td title={ingredient.expired_at}>{ingredient.expired_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SubjectBox>
  );
};
