import { RiSeedlingLine } from "@react-icons/all-files/ri/RiSeedlingLine";
import { RiTimer2Line } from "@react-icons/all-files/ri/RiTimer2Line";
import { CgRemoveR } from "@react-icons/all-files/cg/CgRemoveR";
import { CgAddR } from "@react-icons/all-files/cg/CgAddR";

import { Ingredient } from "shared/types";
import { SubjectBox } from "shared/ui/subjectBox";
import { IconButton } from "shared/ui/iconButton";
import { SearchBox } from "shared/ui/searchBox";
import { useDialog } from "shared/hooks/useDialog";
import { FramerFadeLayout } from "shared/ui/framerFadeLayout";
import { IngredientTable } from "entities/ingredient";
import { IngredientCreationBox } from "widgets/ingredientCreationBox";

import styles from "./fridgePage.module.css";

export const FridgePage = () => {
  const { ref, openDialog, closeDialog } = useDialog();

  return (
    <FramerFadeLayout className="flex-column">
      <select className={styles.fridgeSelection}>
        <option value="거실냉장고">거실냉장고</option>
        <option value="김치냉장고">김치냉장고</option>
      </select>
      <div className="flex-row">
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

      <SubjectBox
        title="재료 현황"
        className={`${styles.ingredientContainer} flex-column-center`}
      >
        <div className={styles.ingredientControls}>
          <IconButton
            Icon={CgAddR}
            className="main-button"
            onClick={() => openDialog()}
          >
            재료 추가
          </IconButton>
          <IconButton Icon={CgRemoveR}>재료 소모</IconButton>
        </div>
        <div className={styles.ingredientActions}>
          <SearchBox />
          <select>
            <option value="expired_at">유통기한 순</option>
            <option value="category">카테고리 순</option>
          </select>
        </div>
        <IngredientTable ingredients={[ingredient]} disabled />
      </SubjectBox>

      <dialog ref={ref} onClick={(e) => closeDialog(e)}>
        <IngredientCreationBox>
          <IconButton
            className={styles.modalCloseButton}
            onClick={(e) => closeDialog(e)}
          >
            취소
          </IconButton>
        </IngredientCreationBox>
      </dialog>
    </FramerFadeLayout>
  );
};

const ingredient: Ingredient = {
  _id: "1",
  name: "감자",
  category: "채소",
  expired_at: new Date(),
  quantity: "150g",
};
