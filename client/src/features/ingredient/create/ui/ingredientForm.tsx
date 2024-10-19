import { SubjectBox } from "shared/ui/subjectBox";
import { Ingredient } from "shared/types";
import { IngredientTable } from "entities/ingredient";

import styles from "./ingredientForm.module.css";

interface Props {
  ingredients: Ingredient[];
}

export const IngredientForm = ({ ingredients }: Props) => {
  return (
    <form>
      <SubjectBox title="장바구니 목록" style={{border: "none"}}>
        <IngredientTable
          className={styles.ingredientTable}
          ingredients={ingredients}
        />
      </SubjectBox>
    </form>
  );
};
