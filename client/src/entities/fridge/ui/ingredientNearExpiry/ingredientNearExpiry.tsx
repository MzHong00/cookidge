import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";

import { SubjectBox } from "shared/ui/subjectBox";
import { IIngredient } from "shared/api/ingredient";

import styles from "./ingredientNearExpiry.module.css";

interface Props {
  threshHold: number;
  ingredients: IIngredient[];
}

export const IngredientNearExpiry = ({ ingredients, threshHold }: Props) => {
  const nearExpiredIngredients = ingredients.filter((ingredient) => {
    const dayMillis = 1000 * 60 * 60 * 24;
    const diffDay =
      (new Date(ingredient.expired_at).getTime() - Date.now()) / dayMillis;

    return diffDay <= threshHold;
  });

  return (
    <SubjectBox
      title="유통기한 임박"
      Icon={RiTimer2Line}
      headerClassName={styles.header}
    >
      <h1>{nearExpiredIngredients.length}</h1>
      <p>{threshHold}일 이내 유통기한 만료 재료 수</p>
    </SubjectBox>
  );
};
