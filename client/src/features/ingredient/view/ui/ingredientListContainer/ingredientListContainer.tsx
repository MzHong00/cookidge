import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { IngredientItemBox } from "../ingredientItemBox/ingredientItemBox";

import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from "./ingredientListContainer.module.css";

export const IngredientListContainer = () => {
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
      <table className={styles.ingredientList}>
        <thead>
        <tr style={{textAlign: "left"}}>
          <th>분류</th>
          <th>이름</th>
          <th>유통기한</th>
          <th>수량</th>
          <th>작업</th>
        </tr>
        </thead>
        <tbody>
        <IngredientItemBox
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
