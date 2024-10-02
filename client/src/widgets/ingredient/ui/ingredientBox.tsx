import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from "./ingredientBox.module.css";

export const IngredientBox = () => {
  return (
    <SubjectBox title="재료 현황" className={styles.ingredientBox}>
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
    </SubjectBox>
  );
};
