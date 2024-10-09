import { RiAddLine } from "@react-icons/all-files/ri/RiAddLine";

import {
  IngredientTableHeader,
  IngredientTableRow,
} from "features/ingredient/view";
import { IconButton } from "shared/ui/iconButton";
import { SubjectBox } from "shared/ui/subjectBox";
import { ItemSelectionBox } from "shared/ui/itemSelectionBox";

import styles from "./ingredientCreationBox.module.css";

export const IngredientCreationBox = () => {
  return (
    <div className={`${styles.container}`}>
      <SubjectBox title="재료 추가">
        <div className={styles.ingredientAddBox}>
          <ItemSelectionBox
            itemList={["직접 추가", "영수증 인식", "재료 인식"]}
            activeItem={"직접 추가"}
            className={styles.selectionBox}
          />
          <table className={styles.ingredientTable}>
            <IngredientTableHeader />
            <tbody>
              <IngredientTableRow _id={""} name={""} category={""} />
            </tbody>
          </table>
          <IconButton
            Icon={RiAddLine}
            title="재료 추가"
            className={styles.addButton}
          />
        </div>
      </SubjectBox>
      <SubjectBox title="추가된 재료 목록">
        <table className={styles.ingredientTable}>
          <IngredientTableHeader />
          <tbody className={styles.addedIngredientTableBody}>
            <IngredientTableRow _id={""} name={""} category={""} />
          </tbody>
        </table>
      </SubjectBox>
      <div className={styles.actionBar}>
        <IconButton title="취소" className={styles.closeButton} />
        <IconButton title="재료 추가 확정(5)" className={styles.decideButton} />
      </div>
    </div>
  );
};
