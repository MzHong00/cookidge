import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { IngredientTableRow, IngredientTableHeader } from "../..";
import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from "./ingredientListContainer.module.css";

export const IngredientListContainer = () => {
  return (
    <SubjectBox title="재료 현황" className={styles.ingredientContainer}>
      <div className={styles.ingredientControls}>
        <IconButton
          Icon={CgAddR}
          title="재료 추가"
          className={styles.addButton}
        />
        <IconButton Icon={CgRemoveR} title="재료 소모" />
      </div>
      <div className={styles.ingredientActions}>
        <SearchBox />
        <select>
          <option value="거실냉장고">거실냉장고</option>
          <option value="김치냉장고">김치냉장고</option>
        </select>
      </div>
      <table className={styles.ingredientList}>
        <IngredientTableHeader />
        <tbody>
          <IngredientTableRow
            _id={""}
            name={"감자"}
            category={"채소류"}
            onClickEdit={() => {}}
            onClickRemove={() => {}}
            disabled
          />
        </tbody>
      </table>
    </SubjectBox>
  );
};
