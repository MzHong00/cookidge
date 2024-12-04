import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";

import { SubjectBox } from "shared/ui/subjectBox";

import styles from './ingredientTotalCount.module.css'

interface Props {
    count: number
}

export const IngredientTotalCount = ({count}: Props) => {
  return (
    <SubjectBox
      title="재료"
      Icon={RiSeedlingLine}
      headerClassName={styles.header}
    >
      <h1>{count}</h1>
      <p>총 재료 수</p>
    </SubjectBox>
  );
};
