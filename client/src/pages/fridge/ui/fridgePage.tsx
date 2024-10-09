import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";

import { IngredientCreationBox } from "features/ingredient/create";
import { IngredientListContainer } from "features/ingredient/view";
import { SubjectBox } from "shared/ui/subjectBox";

import styles from './fridgePage.module.css'

export const FridgePage = () => {
    
    return (
        <>
        <select className={styles.fridgeSelection}>
            <option value="거실냉장고">거실냉장고</option>
            <option value="김치냉장고">김치냉장고</option>
          </select>
          <div className={styles.statusBoard}>
            <SubjectBox
              title="재료"
              Icon={RiSeedlingLine}
              headerClassName={styles.headerReverse}
            >
              <h1>5</h1>
              <p>총 재료 수</p>
            </SubjectBox>
            <SubjectBox
              title="유통기한 임박"
              Icon={RiTimer2Line}
              headerClassName={styles.headerReverse}
            >
              <h1>5</h1>
              <p>3일 이내 유통기한 만료 재료 수</p>
            </SubjectBox>
          </div>

          <IngredientListContainer />
          <dialog>
            <IngredientCreationBox />
          </dialog>
        </>
    )
}